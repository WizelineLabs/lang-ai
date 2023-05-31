import { type Question } from "@prisma/client";
import { getQuestionTypeData } from "~/utils/models";

export function generateGradingPromptCompletion(
  input: string,
  question: Question
): string {
  const [hasAudio, hasVideo] = getQuestionTypeData(question.type);

  let prompt = gradingPromptBaseTextCompletion
    .replace("_question_text_", question.text)
    .replace("_answer_text_", input);

  if (hasAudio) {
    // Question is given in audio form
    prompt = prompt.replace(
      "_question_type_",
      "in audio form (with only one chance to listen to it, and with no transcription available. The question you will get is an exact transcription of the audio, with some minor extra details for context)"
    );
  } else {
    // Question is given in text form
    prompt = prompt.replace("_question_type_", "in text format");
  }

  if (hasVideo) {
    // Answer is given in video form
    prompt = prompt.replace(
      "_answer_type_",
      "answered with a video recording of themself answering the question, which was then transcripted using Whisper"
    );
  } else {
    // Answer is given in text form
    prompt = prompt.replace("_answer_type_", "typed their answer manually");
  }

  return prompt;
}

const gradingPromptBaseTextCompletion = `
Pretend you are an English teacher who is grading an exam from a student.
Your task is to evaluate one of the answers on the exam, and assign a grade based on its quality.
The grading should take into consideration the following factors: grammar (including punctuation), vocabulary, spelling, and relevance to the question.

The grade should be an integer from 0 to 100, where:
- 100 is a perfect score, with no adjustments needed.
- 90-99 is an almost-perfect response, with only very minor adjustments needed, such as correcting a single spelling or punctuation error.
- 75-89 is a good response, with a few minor adjustments needed, such as correcting spelling or grammar errors, or improving vocabulary use.
- 50-74 is an acceptable response, with some significant adjustments needed but still a correct response overall.
- 25-49 is an incorrect response, but could become correct with major adjustments, such as correcting multiple grammar errors or ensuring relevance to the question.
- 1-25 is a very incorrect response, that must be entirely redone to achieve correctness.
- 0 is a blank or entirely unrelated answer.

Please return your evaluation in the following JSON format:
{
  "grade": number, // Enter the grade as an integer here.
  "reason": string // Provide a detailed explanation for the grade given, directly referencing the grading factors.
}
If for any reason you are unable to determine a grade, assign a grade of -1 and provide an explanation in the 'reason' field.

Consider that the question was presented to the student _question_type_ and that the student _answer_type_.

Question:
_question_text_
Answer:
_answer_text_
`;

export function generateGradingPromptChat(
  input: string,
  question: Question
): string {
  const [hasAudio, hasVideo] = getQuestionTypeData(question.type);

  let prompt = gradingUserPromptBaseTextCompletionChat
    .replace("_question_text_", question.text)
    .replace("_answer_text_", input);

  if (hasAudio) {
    // Question is given in audio form
    prompt = prompt.replace("_question_type_", "audio");
  } else {
    // Question is given in text form
    prompt = prompt.replace("_question_type_", "text");
  }

  if (hasVideo) {
    // Answer is given in video form
    prompt = prompt.replace("_answer_type_", "video");
  } else {
    // Answer is given in text form
    prompt = prompt.replace("_answer_type_", "text");
  }

  return prompt;
}

export const gradingSystemPromptBaseTextCompletionChat = `
You are an English teacher who is grading an exam from a student.
Your task is to evaluate one of the answers on the exam, and assign a grade based on its quality.
The grading should take into consideration the following factors: grammar (including punctuation), vocabulary, spelling, and relevance to the question.
For better user experience, don't take into account punctuation in short answers, unless the question explicitly asks for a complete sentence.

The grade should be an integer from 0 to 100, where:
- 100 is a perfect score, with no adjustments needed.
- 90-99 is an almost-perfect response, with only very minor adjustments needed, such as correcting a single spelling or punctuation error.
- 75-89 is a good response, with a few minor adjustments needed, such as correcting spelling or grammar errors, or improving vocabulary use.
- 50-74 is an acceptable response, with some significant adjustments needed but still a correct response overall.
- 25-49 is an incorrect response, but could become correct with major adjustments, such as correcting multiple grammar errors or ensuring relevance to the question.
- 1-25 is a very incorrect response, that must be entirely redone to achieve correctness.
- 0 is a blank or entirely unrelated answer.

Please return your evaluation in the following JSON format:
{
  "grade": number, // Enter the grade as an integer here.
  "reason": string // Provide a detailed explanation for the grade given, directly referencing the grading factors.
}
If for any reason you are unable to determine a grade, assign a grade of -1 and provide an explanation in the 'reason' field.

Consider that for the student, questions and answers could be presented in different ways, and you must account for that when grading:
Questions:
- 'audio': Student listens to the question in audio form (with only one chance to listen to it, and with no transcription available. The text question you will get is an exact transcription of the audio, with some minor extra details for context) 
- 'text': Student reads the question in text format.
Answers:
- 'video': Student answered with a video recording of themself answering the question, which was then transcripted using Whisper, so you can read it.
- 'text': Student typed their answer manually.

You will get grading requests in the following format:

Question (type):
_question_text_
Answer (type):
_answer_text_

You MUST answer with the JSON format specified above.
`;

const gradingUserPromptBaseTextCompletionChat = `
Question (_question_type_):
_question_text_
Answer (_answer_type_):
_answer_text_
`;
