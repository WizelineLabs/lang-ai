import { type CreateTranscriptionResponse } from "openai";
import openai from "./config";
import fs from "fs";

export async function getWhisperTranscription(
  filePath: string,
  prompt?: string,
  temperature?: number | undefined
): Promise<CreateTranscriptionResponse> {
  const stream = fs.createReadStream(filePath);
  const response = await openai.createTranscription(
    stream,
    "whisper-1",
    prompt,
    undefined,
    temperature,
    "en"
  );
  console.log("Whisper", response.status, response.data);
  if (response.status == 200) {
    return response.data;
  } else {
    throw response.data;
  }
}
