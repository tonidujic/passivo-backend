const db = require("../db");

exports.createCredentials = async (data) => {
  const credentials = db.getCollection("credentials");

  return await credentials.insertOne(data);
};

exports.findCredentialById = async (_id, userId) => {
  const credentials = db.getCollection("credentials");

  const result = await credentials.findOne({ _id, userId });
  if (!result) return null;

  return result;
};

exports.getAllCredentials = async (userId) => {
  const credentials = db.getCollection("credentials");
  const result = await credentials.find({ userId }).toArray();

  return result;
};

exports.updateCredential = async (
  userId,
  { password, title, username, website },
  _id
) => {
  const credentials = db.getCollection("credentials");

  await credentials.updateOne(
    { _id, userId },
    {
      $set: { password, title, username, website },
    }
  );

  return await credentials.findOne({ _id, userId });
};

exports.deleteOneCredential = async (_id, userId) => {
  const credentials = db.getCollection("credentials");

  return await credentials.deleteOne({
    _id,
    userId,
  });
};

exports.deleteAllCredentials = async (userId) => {
  const credentials = db.getCollection("credentials");

  return await credentials.deleteMany({ userId });
};
