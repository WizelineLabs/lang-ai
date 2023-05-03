import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
import { uploadFile } from "~/services/aws/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const path = req.query.path as string;
    const buffer = await readFile(path);
    await uploadFile(buffer, "test/hello.m4a");
    res.status(200).json({ done: true });
  } catch (error) {
    res.status(400).json(error);
  }
}
