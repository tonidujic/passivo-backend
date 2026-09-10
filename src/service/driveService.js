const driveRepository = require("../repository/driveRepo");
const AppError = require("../utils/appError");
const { parseFromDB, parseManyFromDB } = require("../utils/general");
const { v4: uuidv4 } = require("uuid");

exports.createFile = async ({
  userId,
  fileName,
  fileType,
  file,
  title,
  favorite,
  iv,
  key,
}) => {
  if (!file) {
    throw new AppError("File not uploaded", 400);
  }

  const savedFile = {
    id: uuidv4(),
    key,
    userId,
    fileName,
    fileType: fileType,
    file,
    title,
    favorite,
    iv,
  };

  await driveRepository.createFile(savedFile);
  return savedFile;
};

exports.getAll = async (userId) => {
  let result = await driveRepository.getAll(userId);

  return parseManyFromDB(result);
};

exports.getOne = async (userId, fileId) => {
  const selectedFile = await driveRepository.getOne(userId, fileId);
  if (!selectedFile) {
    throw new AppError("File not found", 404);
  }
  return parseFromDB(selectedFile);
};

exports.update = async (fileId, updatedInfo, userId) => {
  const result = await driveRepository.update(fileId, updatedInfo, userId);

  if (result.matchedCount === 0) {
    throw new AppError("File not found", 404);
  }
  return result;
};

exports.deleteOne = async (userId, fileId) => {
  const result = await driveRepository.deleteOne(userId, fileId);

  if (result.deletedCount === 0) {
    throw new AppError("File not found", 404);
  }
};

exports.deleteAll = async (userId) => {
  const dbFiles = await driveRepository.getAll(userId);

  if (dbFiles.length === 0) {
    throw new AppError("No files found", 404);
  }

  await driveRepository.deleteAll(userId);
};
