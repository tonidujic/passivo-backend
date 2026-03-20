const db = require("../db");
const general = require("../utils/general");

exports.createPassword = async (data) => {
  const passwords = db.getCollection("passwords");

  return await passwords.insertOne(data);
};

exports.findPasswordById = async (id, userId) => {
  const passwords = db.getCollection("passwords");

  const result = await passwords.findOne({ id, userId });
  if (!result) return null;

  const { _id, ...rest } = result;
  return rest;
};

exports.getAllPasswords = async (userId) => {
  const passwords = db.getCollection("passwords");
  const result = await passwords.find({ userId }).toArray();

  return result.map(({ _id, ...rest }) => rest);
};

exports.updatePassword = async (
  userId,
  { password, title, username, website },
  id
) => {
  const passwords = db.getCollection("passwords");

  return await passwords.updateOne(
    { id, userId },
    {
      $set: { password, title, username, website },
    }
  );
};

exports.deleteOnePassword = async (id, userId) => {
  const passwords = db.getCollection("passwords");

  return await passwords.deleteOne({
    id,
    userId,
  });
};

exports.deleteAllPasswords = async (userId) => {
  const passwords = db.getCollection("passwords");

  return await passwords.deleteMany({ userId });
};
