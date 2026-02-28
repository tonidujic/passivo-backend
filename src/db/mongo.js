const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);
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
