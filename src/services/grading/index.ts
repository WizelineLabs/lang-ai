import {
  type User,
  type Test,
  type Question,
  type UserTest,
  type UserTestAnswer,
} from "@prisma/client";
import { type CreateChatCompletionResponse } from "openai";
import { getQuestionTypeData } from "~/utils/models";
import { getWhisperTranscription } from "../openai/whisper";
import { queryChatGPTChat } from "../openai/chatgpt";
import { convertS3VideoToAudio } from "../ffmpeg/s3-conversion";
import {
  generateGradingPromptChat,
  gradingSystemPromptBaseTextCompletionChat,
} from "./prompts";

import { prisma } from "~/server/db";

type Exam = UserTest & {
  user: User;
  test: Test;
};

type Answer = UserTestAnswer & {
  question: Question;
};

type Grade = {
  grade: number;
  reason: string;
  feedback?: string;
};

type AnswerGrade = {
  answer: Answer;
  grade: Grade;
};

export async function gradeUserTest(userTestId: string) {
  const userTest = await prisma.userTest.findUnique({
    where: { id: userTestId },
    include: { test: true, user: true },
  });
  const answers = await prisma.userTestAnswer.findMany({
    where: { userTestId: userTestId },
    include: { question: true },
  });

  if (!userTest || answers.length === 0) {
    throw new Error("UserTest data not found");
  }

  // Grade every answer
  const gradeAll = Promise.allSettled(
    answers.map((answer) => gradeAnswer(answer))
  );
  const results = await gradeAll;

  const gradedAnswers = results.map((result, i) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const answer = answers[i]!;
    let grade: Grade;
    let answerText = answer.answer;

    if (result.status === "fulfilled") {
      grade = result.value.grade;
      answerText = result.value.answer;
    } else {
      // Create grade object for failed gradings
      grade = {
        grade: -2,
        reason: `Internal grading process failed: ${String(result.reason)}`,
      };
    }

    return {
      answer: answer,
      grade: grade,
      answerText: answerText,
    };
  });

  // Calculate final test grade & feedback
  const isGradingIncomplete = !!gradedAnswers.find(
    (obj) => obj.grade.grade < 0
  );
  const finalGrade = isGradingIncomplete
    ? -1
    : getTestGrade(userTest, gradedAnswers);
  // TODO: Feedback
  // ...

  if (isGradingIncomplete) {
    // Some gradings failed, so print them in console
    const gradeTexts = gradedAnswers
      .filter((a) => a.grade.grade < 0)
      .map((a) => `\n  ${a.answer.id} failed with reason: ${a.grade.reason}`);

    console.error(`UserTest grading failed for ${userTestId}:`, ...gradeTexts);
  }

  // Update all changes in database in a single transaction
  await prisma.$transaction([
    ...gradedAnswers.map((entry) =>
      prisma.userTestAnswer.update({
        where: {
          id: entry.answer.id,
        },
        data: {
          answer: entry.answerText,
          evaluation: entry.grade.grade,
          evaluationReason: entry.grade.reason,
          feedback: entry.grade.feedback,
        },
      })
    ),
    prisma.userTest.update({
      where: { id: userTest.id },
      data: {
        score: finalGrade,
        feedback: "Generic feedback",
      },
    }),
  ]);
}

async function gradeAnswer(answer: Answer) {
  const [hasAudio, hasVideo] = getQuestionTypeData(answer.question.type);

  // Get the question as text
  let questionText: string;
  if (hasAudio) {
    if (answer.question.audioTranscript) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      questionText = `${answer.question.audioTranscript}\n\n${answer.question.text}`;
    } else {
      throw new Error(
        "Question should have audio transcript but it wasn't found"
      );
    }
  } else {
    questionText = answer.question.text;
  }

  // Get the answer as text
  let answerText: string;
  if (hasVideo) {
    // Transcript video before sending to prompt
    if (answer.videoKey) {
      const videoKey = answer.videoKey;
      const audioData = await convertS3VideoToAudio(videoKey);
      const transcription = await getWhisperTranscription(
        audioData.filePath,
        undefined,
        0,
        true
      );
      answerText = transcription.text;
    } else {
      throw new Error("Answer should have video but it wasn't found");
    }
  } else {
    // Use text answer from the user
    answerText = answer.answer;
  }

  // Grade the answer
  const prompt = generateGradingPromptChat(
    questionText,
    answerText,
    answer.question
  );
  const chatGPTAnswer = await queryChatGPTChat(
    gradingSystemPromptBaseTextCompletionChat,
    prompt
  );
  const grade = parseChatGPTResponse(chatGPTAnswer);

  return {
    grade: grade,
    answer: answerText,
  };
}

function parseChatGPTResponse(response: CreateChatCompletionResponse): Grade {
  try {
    if (response.choices[0]?.message) {
      const message = response.choices[0].message;
      console.log("ChatGPT response:", message.content);
      return JSON.parse(message.content) as Grade;
    } else {
      throw new Error("JSON.parse failed");
    }
  } catch {
    return {
      grade: -1,
      reason: "Parsing error on client",
    };
  }
}

function getTestGrade(userTest: Exam, answers: AnswerGrade[]): number {
  // TODO: Grade based on exam type
  // if (userTest.test.type === 0) {
  //   // Exam is evaluation
  // } else {
  //   // Exam is from learn tab
  // }

  // Test grades are a weighted average of their answer's grades.
  // Answer's weights are relative within the exam itself only.
  const sumOfWeights = answers.reduce(
    (accum, item) => accum + item.answer.question.weigh.toNumber(),
    0
  );
  const sumOfWeightedGrades = answers.reduce(
    (accum, item) =>
      accum + item.grade.grade * item.answer.question.weigh.toNumber(),
    0
  );
  const grade = Math.floor(sumOfWeightedGrades / sumOfWeights);
  return grade;
}
