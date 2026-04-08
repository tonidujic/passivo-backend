const { MongoClient } = require("mongodb");
const config = require("../config");

let _db;
let _client;
exports.connectDB = () => {
  _client = new MongoClient(config.MONGO_URI);
  _db = _client.db("passivo_db");
};
exports.getDB = () => _db;

exports.getCollection = (collection) => {
  return _db.collection(collection);
};
