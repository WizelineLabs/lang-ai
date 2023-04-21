import { type CreateCompletionResponse } from "openai";
import openai from "./config";

export async function queryChatGPT(
  prompt: string
): Promise<CreateCompletionResponse> {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  return response.data;
}
