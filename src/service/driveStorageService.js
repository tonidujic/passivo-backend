const {
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const driveUtil = require("../utils/driveUtil");
const config = require("../config");

exports.createFile = async (file) => {
  const fileKey = uuidv4();
  await driveUtil.r2.send(
    new PutObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );
  return fileKey;
};

exports.getOne = async (fileKey) => {
  const selectedFile = await driveUtil.r2.send(
    new GetObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileKey,
    })
  );

  return selectedFile;
};

exports.deleteOne = async (fileKey) => {
  return await driveUtil.r2.send(
    new DeleteObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileKey,
    })
  );
};

exports.deleteAll = async (objects) => {
  await driveUtil.r2.send(
    new DeleteObjectsCommand({
      Bucket: config.R2_BUCKET_NAME,
      Delete: {
        Objects: objects,
      },
    })
  );
};
