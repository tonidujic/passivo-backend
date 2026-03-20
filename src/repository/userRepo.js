const db = require("../db");

exports.createUser = async (user) => {
  const users = db.getCollection("users");
  return await users.insertOne(user);
};

exports.findUserByUsername = async (username) => {
  const users = db.getCollection("users");

  return await users.findOne({ username });
};
