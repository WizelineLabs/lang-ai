import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getFile, uploadFile } from "../aws/s3";
import { convertWebMtoMP3 } from "./conversion";

type S3Conversion = { key: string; file: Buffer };

/**
 * Converts a video file on S3 to a audio-only file.
 * @param key The S3 key for the video.
 * @returns The S3 key and file for the converted audio.
 */
export async function convertS3VideoToAudio(
  key: string
): Promise<S3Conversion> {
  // Calculate temp file paths
  const tempName = randomUUID();
  const tempExt = path.extname(key);
  const inputTempPath = path.join(__dirname, "temp", tempName + tempExt);
  const outputTempPath = path.join(__dirname, "temp", tempName + ".mp3");

  // Get file and write it to disk
  const s3File = await getFile(key);
  const data = await s3File.transformToByteArray();

  await fs.writeFile(inputTempPath, data);

  // Convert the file
  await convertWebMtoMP3(inputTempPath, outputTempPath);

  // Retrieve and upload the new file
  const convertedFile = await fs.readFile(outputTempPath);

  const parsedPath = path.parse(key);
  const s3Path = path.join(parsedPath.dir, parsedPath.name + ".mp3");
  await uploadFile(convertedFile, s3Path);

  // Remove temp file
  await fs.unlink(inputTempPath);
  await fs.unlink(outputTempPath);

  // Return audio s3 key
  return { key: s3Path, file: convertedFile };
}
