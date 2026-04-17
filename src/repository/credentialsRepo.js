const db = require("../db");
const { parseManyFromDB, parseToDB } = require("../utils/general");

exports.createCredentials = async (data) => {
  const credentials = db.getCollection("credentials");
  return await credentials.insertOne(parseToDB(data));
};

exports.findCredentialById = async (id, userId) => {
  const credentials = db.getCollection("credentials");

  const result = await credentials.findOne({ _id: id, userId });
  if (!result) return null;

  return result;
};

exports.getAllCredentials = async (userId) => {
  const credentials = db.getCollection("credentials");
  let result = await credentials.find({ userId }).toArray();

  return parseManyFromDB(result);
};

exports.updateCredential = async (
  userId,
  { password, title, username, website },
  id
) => {
  const credentials = db.getCollection("credentials");

  await credentials.updateOne(
    { _id: id, userId },
    {
      $set: { password, title, username, website },
    }
  );

  return await credentials.findOne({ _id: id, userId });
};

exports.deleteOneCredential = async (id, userId) => {
  const credentials = db.getCollection("credentials");

  return await credentials.deleteOne({
    _id: id,
    userId,
  });
};

exports.deleteAllCredentials = async (userId) => {
  const credentials = db.getCollection("credentials");

  return await credentials.deleteMany({ userId });
};
