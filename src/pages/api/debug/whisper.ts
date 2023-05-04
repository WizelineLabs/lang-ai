import type { NextApiRequest, NextApiResponse } from "next";
import { getWhisperTranscription } from "~/services/openai/whisper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const path = req.query.path as string;
    const prompt = req.query.prompt as string | undefined;
    const transcription = await getWhisperTranscription(path, prompt);
    res.status(200).json(transcription);
  } catch (error) {
    res.status(400).json(error);
  }
}
