/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { type Question } from "@prisma/client";
import {
  generateGradingPromptChat,
  gradingSystemPromptBaseTextCompletionChat,
} from "~/services/grading/prompts";
import { queryChatGPTChat } from "~/services/openai/chatgpt";

type Input = {
  question: Question;
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const input = req.body as Input;
    console.log(input);
    const prompt = generateGradingPromptChat(input.answer, input.question);
    console.log(prompt);
    const response = await queryChatGPTChat(
      gradingSystemPromptBaseTextCompletionChat,
      prompt
    );
    console.log(response);
    let data: any;
    if (response.choices[0]?.message) {
      const text = response.choices[0].message.content;
      try {
        data = JSON.parse(text);
      } catch {
        data = "unparsable";
      }
    } else {
      data = null;
    }
    res.status(200).json({
      data: data,
      response: response,
    });
  } catch (e) {
    const error = e as Error;
    res.status(400).json(error);
  }
}
