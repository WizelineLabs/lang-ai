import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import { env } from "~/env.mjs";

const s3 = new S3Client({
  region: env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
// TODO: Cambiar dependiendo del ambiente
const bucketName = env.AWS_S3_BUCKET;

export async function getFile(filePath: string) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: filePath,
  });
  const object = await s3.send(command);
  if (object.Body) {
    return object.Body;
  }
  throw Error("File was found but had no body");
}

export async function uploadFile(file: Buffer, path: string) {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: bucketName,
      Key: path,
      Body: file,
    },
  });
  upload.on("httpUploadProgress", (progress) => {
    console.log("Upload progress:", progress);
  });
  await upload.done();
}
