const db = require("../db");
const { parseToDB } = require("../utils/general");

exports.createFile = async (savedFile) => {
  const files = db.getCollection("drive");
  return await files.insertOne(parseToDB(savedFile));
};

exports.getAll = async (userId) => {
  const files = db.getCollection("drive");
  const selectedFiles = await files.find({ userId }).toArray();

  return selectedFiles;
};

exports.update = async (fileKey, updatedInfo, userId) => {
  const files = db.getCollection("drive");

  return await files.updateOne({ key: fileKey, userId }, { $set: updatedInfo });
};

exports.deleteOne = async (userId, fileKey) => {
  const files = db.getCollection("drive");
  return await files.deleteOne({ userId, key: fileKey });
};

exports.deleteAll = async (userId) => {
  const files = db.getCollection("drive");
  return await files.deleteMany({ userId });
};
