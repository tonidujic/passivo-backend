const credentialsRepository = require("../repository/credentialsRepo");
const AppError = require("../utils/appError");
const { v4: uuidv4 } = require("uuid");

exports.createCredential = async (
  title,
  username,
  password,
  website,
  userId
) => {
  const credential = {
    _id: uuidv4(),
    userId,
    title,
    username,
    password,
    website,
  };
  await credentialsRepository.createCredentials(credential);

  return credential;
};

exports.getOne = async (id, userId) => {
  const result = await credentialsRepository.findCredentialById(id, userId);
  if (result === null) {
    throw new AppError("Credential not found", 404);
  }
  return result;
};

exports.update = async (userId, updatedInfo, _id) => {
  const result = await credentialsRepository.updateCredential(
    userId,
    updatedInfo,
    _id
  );
  if (result.matchedCount === 0) {
    throw new AppError("Document not found", 404);
  }
  return { _id, userId, updatedInfo };
};

exports.deleteOne = async (id, userId) => {
  const result = await credentialsRepository.deleteOneCredential(id, userId);
  if (result.deletedCount === 0) {
    throw new AppError("Document not found", 404);
  }
};

exports.deleteAll = async (userId) => {
  const result = await credentialsRepository.deleteAllCredentials(userId);
  if (result.deletedCount === 0) {
    throw new AppError("No documents for delete", 404);
  }
};
