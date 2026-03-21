const db = require("../db");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const driveUtil = require("../utils/driveUtil");

const { v4: uuidv4 } = require("uuid");
const config = require("../config");

exports.uploadFile = async (userId, file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  const fileKey = uuidv4();
  await driveUtil.r2.send(
    new PutObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );
  const savedFile = {
    key: fileKey,
    userId,
    fileName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  };

  const files = db.getCollection("drive");
  await files.insertOne(savedFile);
  return savedFile;
};

exports.getAll = async () => {
  let selectedFiles = await driveUtil.r2.send(
    new ListObjectsV2Command({
      Bucket: config.R2_BUCKET_NAME,
    })
  );

  return selectedFiles;
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

exports.renameFile = async (fileKey, renamed) => {
  const files = db.getCollection("drive");

  const selectedFile = await driveUtil.r2.send(
    new GetObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileKey,
    })
  );

  selectedFile.fileName = renamed;
  console.log(files);

  const result = await files.findOne({ key: fileKey });

  if (!result) {
    return (selectedFile = "No files founded");
  }
  await files.updateOne({ key: fileKey }, { $set: { fileName: renamed } });
  return selectedFile.fileName;
};

exports.deleteOne = async (userId, fileKey) => {
  const selectedFile = await driveUtil.r2.send(
    new GetObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileKey,
    })
  );

  const files = db.getCollection("drive");
  await files.deleteOne({ userId, key: fileKey });

  await driveUtil.r2.send(
    new DeleteObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileKey,
    })
  );
  return selectedFile;
};

exports.deleteAll = async (userId) => {
  const files = db.getCollection("drive");

  const dbFiles = await files.find({ userId }).toArray();

  if (dbFiles.length === 0) {
    return [];
  }

  const objects = dbFiles.map((file) => ({
    Key: file.key,
  }));

  await driveUtil.r2.send(
    new DeleteObjectsCommand({
      Bucket: config.R2_BUCKET_NAME,
      Delete: {
        Objects: objects,
      },
    })
  );

  await files.deleteMany({ userId });

  return dbFiles;
};
