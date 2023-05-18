import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { convertWebMtoMP3 } from '~/services/ffmpeg/conversion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const input = req.query.input as string;
        const output = req.query.output as string;

        await convertWebMtoMP3(input, output)
        res.status(200).json({ hello: 'world' })
    } catch (error) {
        const err = error as any
        res.status(400).json({ error: err.message });
    }
}