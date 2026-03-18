const dbController = require("../db");

exports.createUser = async (username, password) => {
  const users = dbController.getCollection("users");

  return await users.insertOne({ username, password });
};

exports.findUserByUsername = async (username) => {
  const users = dbController.getCollection("users");

  return await users.findOne({ username });
};
