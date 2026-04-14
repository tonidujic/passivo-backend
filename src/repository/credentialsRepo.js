const db = require("../db");

exports.createCredentials = async (data) => {
  const credentials = db.getCollection("credentials");

  return await credentials.insertOne(data);
};

exports.findCredentialById = async (id, userId) => {
  const credentials = db.getCollection("credentials");

  const result = await credentials.findOne({ id, userId });
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
  id
) => {
  const credentials = db.getCollection("credentials");

  return await credentials.updateOne(
    { id, userId },
    {
      $set: { password, title, username, website },
    }
  );
};

exports.deleteOneCredential = async (id, userId) => {
  const credentials = db.getCollection("credentials");

  return await credentials.deleteOne({
    id,
    userId,
  });
};

exports.deleteAllCredentials = async (userId) => {
  const credentials = db.getCollection("credentials");

  return await credentials.deleteMany({ userId });
};
