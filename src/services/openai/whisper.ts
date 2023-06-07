import { type CreateTranscriptionResponse } from "openai";
import openai from "./config";
import fs from "fs";
import fsPromises from "fs/promises";

export async function getWhisperTranscription(
  file: string,
  prompt?: string,
  temperature?: number | undefined,
  deleteFile = false
): Promise<CreateTranscriptionResponse> {
  const response = await openai.createTranscription(
    fs.createReadStream(file),
    "whisper-1",
    prompt,
    undefined,
    temperature,
    "en"
  );
  console.log("Whisper", response.status, response.data);
  if (deleteFile) {
    await fsPromises.unlink(file);
  }
  if (response.status == 200) {
    return response.data;
  } else {
    throw response.data;
  }
}
