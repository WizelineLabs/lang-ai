import ffmpeg from 'fluent-ffmpeg';


export function convertWebMtoMP3(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
        .output(outputPath)
        .noVideo()
        .format('mp3')
        .outputOptions('-ab','192k')
        .outputOptions('-strict -2')
        .on('end', () => {
            resolve();
        })
        
        .on('error', (err) => {
            console.error(err)
            reject(err);
        })
        .run();
    });
}

