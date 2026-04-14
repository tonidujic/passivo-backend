const db = require("../db");

exports.createUser = async (user) => {
  const users = db.getCollection("users");
  await users.createIndex({ username: 1 }, { unique: true });
  return await users.insertOne(user);
};

exports.findUserByUsername = async (username) => {
  const users = db.getCollection("users");

  return await users.findOne({ username });
};
