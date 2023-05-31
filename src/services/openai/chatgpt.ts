import {
  type CreateChatCompletionResponse,
  type CreateCompletionResponse,
} from "openai";
import openai from "./config";

export async function queryChatGPTChat(
  systemPrompt: string,
  userPrompt: string
): Promise<CreateChatCompletionResponse> {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      { role: "user", content: userPrompt },
    ],
    temperature: 0,
  });
  return response.data;
}

export async function queryChatGPTCompletion(
  prompt: string
): Promise<CreateCompletionResponse> {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: undefined,
    top_p: undefined,
    frequency_penalty: undefined,
    presence_penalty: undefined,
  });
  return response.data;
}
