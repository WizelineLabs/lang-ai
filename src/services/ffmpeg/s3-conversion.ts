import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getFile, uploadFile } from "../aws/s3";
import { convertWebMtoMP3 } from "./conversion";

type S3Conversion = { key: string; filePath: string };

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
  const inputTempPath = path.join(process.cwd(), "temp", tempName + tempExt);
  const outputTempPath = path.join(process.cwd(), "temp", tempName + ".mp3");

  // Get file and write it to disk
  const s3File = await getFile(key);
  const data = await s3File.transformToByteArray();

  console.log("Will write file to", inputTempPath);

  await fs.mkdir(path.join(process.cwd(), "temp"), { recursive: true });
  await fs.writeFile(inputTempPath, data);

  console.log("Did write file to", inputTempPath);

  // Convert the file
  await convertWebMtoMP3(inputTempPath, outputTempPath);

  console.log("Did convert file to", outputTempPath);

  // Retrieve and upload the new file
  const convertedFile = await fs.readFile(outputTempPath);

  console.log("Did read convert file from", outputTempPath);

  const parsedPath = path.parse(key);
  const s3Path = path
    .join(parsedPath.dir, parsedPath.name + ".mp3")
    .replace(/\\/g, "/"); // Replace backslashes in case they exist
  await uploadFile(convertedFile, s3Path);

  // Remove temp file
  await fs.unlink(inputTempPath);
  //await fs.unlink(outputTempPath);

  // Return audio s3 key
  return { key: s3Path, filePath: outputTempPath };
}
