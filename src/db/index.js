const { MongoClient } = require("mongodb");
const config = require("../config");

let _db;
let _client;
exports.connectDB = async () => {
  _client = new MongoClient(config.MONGO_URI);
  try {
    _db = _client.db("passivo_db");
  } catch (err) {
    console.log(err.message);
  }
};

exports.getDB = () => {
  return _db;
};
