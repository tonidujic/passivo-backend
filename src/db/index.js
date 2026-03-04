const { MongoClient } = require("mongodb");
const config = require("./config");

const client = new MongoClient(config.MONGO_URI);
let db;
exports.connectDB = async () => {
  try {
    await client.connect();
    db = client.db("passivo_db");
  } catch (err) {
    console.log(err.message);
  }
};

exports.getDB = () => {
  return db;
};
