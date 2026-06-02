const driveRepository = require("../repository/driveRepo");
const AppError = require("../utils/appError");
const { parseManyFromDB } = require("../utils/general");
const driveStorageService = require("../service/driveStorageService");
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

  await driveStorageService.createFile(file);

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

exports.getOne = async (fileKey) => {
  const selectedFile = await driveStorageService.getOne(fileKey);
  if (!selectedFile) {
    throw new AppError("File not found", 404);
  }
  return selectedFile;
};

exports.update = async (fileKey, updatedInfo, userId) => {
  const result = await driveRepository.update(fileKey, updatedInfo, userId);

  if (result.matchedCount === 0) {
    throw new AppError("File not found", 404);
  }
  return result;
};

exports.deleteOne = async (userId, fileKey) => {
  const result = await driveRepository.deleteOne(userId, fileKey);

  if (result.deletedCount === 0) {
    throw new AppError("File not found", 404);
  }
  await driveStorageService.deleteOne(fileKey);
};

exports.deleteAll = async (userId) => {
  const dbFiles = await driveRepository.getAll(userId);

  if (dbFiles.length === 0) {
    throw new AppError("No files found", 404);
  }

  const objects = dbFiles.map((file) => ({
    Key: file.key,
  }));

  await driveStorageService.deleteAll(objects);
  await driveRepository.deleteAll(userId);
};
