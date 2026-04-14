const { MongoClient } = require("mongodb");
const config = require("../config");

let _db = null;
let _client = null;
exports.connectDB = async () => {
  _client = new MongoClient(config.MONGO_URI);
  _db = _client.db("passivo_db");

  try {
    await _db.command({ ping: 1 });
    await createIndex();
  } catch (error) {
    _db = null;
    _client = null;

    throw error;
  }
};
exports.getDB = () => _db;

exports.getCollection = (collection) => {
  return _db.collection(collection);
};

const createIndex = async () => {
  const users = _db.collection("users");
  await users.createIndex({ username: 1 }, { unique: true });
};
