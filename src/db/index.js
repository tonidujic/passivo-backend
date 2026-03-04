const { MongoClient } = require("mongodb");
const config = require("../config");

let _db;
let _client;
exports.connectDB = async () => {
  if (_db) return;
  _client = new MongoClient(config.MONGO_URI);
  try {
    await _client.connect();
    _db = _client.db("passivo_db");
  } catch (err) {
    console.log(err.message);
  }
};

exports.getDB = () => {
  return _db;
};
