const credentialsRepository = require("../repository/credentialsRepo");
const AppError = require("../utils/appError");
const { v4: uuidv4 } = require("uuid");
const { parseFromDB } = require("../utils/general");

exports.createCredential = async (
  title,
  website,
  username,
  credential,
  favorite,
  userId
) => {
  const credentialObj = {
    id: uuidv4(),
    userId,
    title,
    website,
    username,
    credential,
    favorite,
  };
  await credentialsRepository.createCredentials(credentialObj);

  return credentialObj;
};

exports.getOne = async (id, userId) => {
  let result = await credentialsRepository.findCredentialById(id, userId);
  if (result === null) {
    throw new AppError("Credential not found", 404);
  }

  return parseFromDB(result);
};

exports.update = async (userId, updatedInfo, id) => {
  let result = await credentialsRepository.updateCredential(
    userId,
    updatedInfo,
    id
  );
  if (!result) {
    throw new AppError("Document not found", 404);
  }
  return { id, userId, updatedInfo };
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
