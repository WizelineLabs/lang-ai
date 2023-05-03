import { type S3 } from "aws-sdk";
import { s3 } from "./sdk";

// TODO: Cambiar dependiendo del ambiente
const bucketName = "langai-dev";

export async function getFile(filePath: string) {
  const object = await s3
    .getObject({
      Bucket: bucketName,
      Key: filePath,
    })
    .promise();
  if (object.Body) {
    return object.Body;
  }
  throw Error("File was found but had no body");
}

export async function uploadFile(file: S3.Body, path: string) {
  await s3
    .upload({
      Bucket: bucketName,
      Key: path,
      Body: file,
    })
    .promise();
}
