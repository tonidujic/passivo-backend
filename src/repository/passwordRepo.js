const dbController = require("../db");
const general = require("../utils/general");

exports.createPassword = async (userId, title, username, website) => {
  const passwords = dbController.getCollection("passwords");

  return await passwords.insertOne({
    userId,
    title,
    username,
    website,
  });
};

exports.findPasswordById = async (id, userId) => {
  const passwords = dbController.getCollection("passwords");

  const result = await passwords.findOne({ _id: id, userId });
  return general.parseFromDB(result);
};

exports.getAllPasswords = async (userId) => {
  const passwords = dbController.getCollection("passwords");

  const result = await passwords.find({ userId }).toArray();
  return result.map((doc) => general.parseFromDB(doc));
};

exports.updatePassword = async (
  userId,
  { password, title, username, website },
  id
) => {
  const passwords = dbController.getCollection("passwords");

  return await passwords.updateOne(
    {
      _id: id,
      userId,
    },
    {
      $set: { password, title, username, website },
    }
  );
};

exports.deleteOnePassword = async (id, userId) => {
  const passwords = dbController.getCollection("passwords");

  return await passwords.deleteOne({
    _id: id,
    userId,
  });
};

exports.deleteAllPasswords = async (userId) => {
  const passwords = dbController.getCollection("passwords");

  return await passwords.deleteMany({ userId });
};
