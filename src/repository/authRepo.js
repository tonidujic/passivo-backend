const db = require("../db");
const { parseToDB } = require("../utils/general");

exports.createUser = async (user) => {
  let users = db.getCollection("users");
  return await users.insertOne(parseToDB(user));
};

exports.findUserByUsername = async (username) => {
  const users = db.getCollection("users");

  return await users.findOne({ username });
};
