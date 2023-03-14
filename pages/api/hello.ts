// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryChatGPT } from '@/services/openai/test'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateCompletionResponse } from 'openai'

type Data = {
  response?: CreateCompletionResponse
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const value = await queryChatGPT()
    res.status(200).json({ response: value })
  } catch (error) {
    res.status(500).json({ error: error })
  } 
}
