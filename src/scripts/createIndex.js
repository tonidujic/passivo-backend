require("dotenv").config();

const { connectDB, getDB } = require("../db");

(async function () {
  await connectDB();
  const db = getDB();
  const users = db.collection("users");
  await users.createIndex({ username: 1 }, { unique: true });
})();
