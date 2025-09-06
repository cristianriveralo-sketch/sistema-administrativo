import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadToS3 = async (fileBuffer: Buffer, fileName: string, mimetype: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${Date.now()}-${fileName}`, 
    Body: fileBuffer,
    ContentType: mimetype,
  };

  return s3.upload(params).promise(); 
};
