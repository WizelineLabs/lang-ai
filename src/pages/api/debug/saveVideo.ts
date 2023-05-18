import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export function saveVid(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    const { videoBlob } = req.body;

    // Generate a unique file name for the video
    const videoFileName = `WebcamTest.webm`;

    // Define the path where the video will be saved
    const savePath = path.join(process.cwd(), 'videos', videoFileName);

    // Convert the video blob to a buffer
    const buffer = Buffer.from(videoBlob, 'base64');

    // Save the video file
    fs.writeFile(savePath, buffer, (err) => {
    if (err) {
        console.error('Failed to save the video file:', err);
        res.status(500).json({ error: 'Failed to save the video file' });
    } else {
        console.log('Video file saved successfully!');
        res.status(200).json({ message: 'Video file saved successfully' });
    }
    });
} else {
    res.status(405).json({ error: 'Method Not Allowed' });
}
}