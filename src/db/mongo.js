const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);
let db;
// exports.connectDB = async () => {
//   try {
//     console.log("MONGO_URI exists?", !!process.env.MONGO_URI);
//     await client.connect();
//     db = client.db("passivo_db");
//   } catch (err) {
//     console.log(err.message);
//   }
// };

exports.connectDB = async () => {
  try {
    console.log("➡️ Connecting to Mongo...");
    await client.connect();
    console.log("✅ Connected to Mongo!");
    db = client.db("passivo_db");
  } catch (err) {
    console.log("❌ Mongo connect error:", err);
    throw err; // važno da app.js vidi da je failalo
  }
};

exports.getDB = () => {
  return db;
};
