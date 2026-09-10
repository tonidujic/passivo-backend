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

exports.getOne = async (userId, fileId) => {
  const files = db.getCollection("drive");
  return await files.findOne({ _id: fileId, userId });
};

exports.update = async (fileId, updatedInfo, userId) => {
  const files = db.getCollection("drive");

  return await files.updateOne({ _id: fileId, userId }, { $set: updatedInfo });
};

exports.deleteOne = async (userId, fileId) => {
  const files = db.getCollection("drive");
  return await files.deleteOne({ _id: fileId, userId });
};

exports.deleteAll = async (userId) => {
  const files = db.getCollection("drive");
  return await files.deleteMany({ userId });
};
