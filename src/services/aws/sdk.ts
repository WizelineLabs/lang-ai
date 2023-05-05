import AWS from "aws-sdk";

console.log("Setting up AWS...");
//console.log("AWS Config:", AWS.config);

AWS.config.getCredentials((err, credentials) => {
  if (credentials) {
    console.log("Connected to AWS successfully");
  } else if (err) {
    // credentials not loaded
    console.error("Credentials error:", err.message);
    console.log(err.stack);
  } else {
    console.error("Unknown error when connecting to AWS");
  }
});

AWS.config.update({ region: "us-east-2" });

/**
 * AMAZON S3 (Almacenamiento de archivos)
 */
export const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

s3.listBuckets(function (err, data) {
  if (err) {
    console.log("Error getting buckets:", err);
  } else {
    console.log("AWS Buckets:", data.Buckets);
  }
});
