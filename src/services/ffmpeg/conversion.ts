import ffmpeg from 'fluent-ffmpeg';


export function convertWebMtoMP3(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat('mp3')
            .on('end', () => {
                resolve();
            })

        .on('error', (err) => {
            reject(err);
        })
        .save(outputPath);
    });
}

