const { MongoClient } = require("mongodb");
const config = require("../config");

let _db;
let _client;
exports.connectDB = () => {
  _client = new MongoClient(config.MONGO_URI);
  _db = _client.db("passivo_db");
};

// exports.getDB = () => {
//   return _db;
// };

const getDB = () => _db;
exports.getDB = getDB;

exports.getCollection = (collection) => {
  const db = getDB();
  return db.collection(collection);
};
