const driveRepository = require("../repository/driveRepo");
const AppError = require("../utils/appError");
const { parseManyFromDB } = require("../utils/general");
const driveStorageService = require("../service/driveStorageService");
const { v4: uuidv4 } = require("uuid");

exports.createFile = async (userId, file) => {
  if (!file) {
    throw new AppError("File not uploaded", 400);
  }

  const fileKey = await driveStorageService.createFile(file);

  const savedFile = {
    id: uuidv4(),
    key: fileKey,
    userId,
    fileName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  };

  await driveRepository.createFile(savedFile);
  return savedFile;
};

exports.getAll = async (userId) => {
  let result = await driveRepository.getAll(userId);
  if (result.length === 0) {
    throw new AppError("Files not found", 404);
  }

  return parseManyFromDB(result);
};

exports.getOne = async (fileKey) => {
  const selectedFile = await driveStorageService.getOne(fileKey);
  if (!selectedFile) {
    throw new AppError("File not found", 404);
  }
  return selectedFile;
};

exports.update = async (fileKey, renamed, userId) => {
  if (!renamed) {
    throw new AppError("Renamed name is required", 400);
  }
  const result = await driveRepository.update(fileKey, renamed, userId);

  if (result.matchedCount === 0) {
    throw new AppError("File not found", 404);
  }
  return renamed;
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
