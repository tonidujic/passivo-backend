const db = require("../db");

exports.uploadFile = async (savedFile) => {
  const files = db.getCollection("drive");
  return await files.insertOne(savedFile);
};

exports.getAll = async (userId) => {
  const files = db.getCollection("drive");
  const selectedFiles = await files.find({ userId }).toArray();

  return selectedFiles;
};

exports.renameFile = async (fileKey, renamed, userId) => {
  const files = db.getCollection("drive");

  const result = await files.updateOne(
    { key: fileKey, userId },
    { $set: { fileName: renamed } }
  );
  return result;
};

exports.deleteOne = async (userId, fileKey) => {
  const files = db.getCollection("drive");
  return await files.deleteOne({ userId, key: fileKey });
};

exports.deleteAll = async (userId) => {
  const files = db.getCollection("drive");
  return await files.deleteMany({ userId });
};
