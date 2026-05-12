const db = require("../db");
const { parseToDB } = require("../utils/general");

exports.createUser = async (user) => {
  let users = db.getCollection("users");
  return await users.insertOne(parseToDB(user));
};

exports.findUserByEmail = async (email) => {
  const users = db.getCollection("users");

  return await users.findOne({ email });
};
