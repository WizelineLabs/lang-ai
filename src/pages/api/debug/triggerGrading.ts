import type { NextApiRequest, NextApiResponse } from "next";
import { gradeUserTest } from "~/services/grading";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userTestId = req.query.userTestId as string;

    await gradeUserTest(userTestId);
    res.status(200).json({ success: true });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
}
