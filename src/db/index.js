const { MongoClient } = require("mongodb");
const config = require("../config");
const catchAsync = require("../utils/catchAsync");

let _db;
let _client;
exports.connectDB = catchAsync(async () => {
  _client = new MongoClient(config.MONGO_URI);
  _db = _client.db("passivo_db");
});

exports.getDB = () => {
  return _db;
};
