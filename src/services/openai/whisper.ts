import { type CreateTranscriptionResponse } from "openai";
import openai from "./config";
import fs from "fs";

export async function getWhisperTranscription(
  file: string | Buffer,
  prompt?: string,
  temperature?: number | undefined
): Promise<CreateTranscriptionResponse> {
  let stream: fs.ReadStream | Buffer;
  if (typeof file === "string") {
    stream = fs.createReadStream(file);
  } else {
    stream = file;
  }
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
