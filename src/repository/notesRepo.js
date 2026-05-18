const db = require("../db");
const { parseToDB } = require("../utils/general");

exports.createNotes = async (savedNote) => {
  const notes = db.getCollection("notes");

  return await notes.insertOne(parseToDB(savedNote));
};

exports.findNotesById = async (id, userId) => {
  const notes = db.getCollection("notes");

  return await notes.findOne({
    id,
    userId,
  });
};

exports.getAll = async (userId) => {
  const notes = db.getCollection("notes");

  return await notes.find({ userId }).toArray();
};

exports.update = async (userId, updatedInfo, id) => {
  const notes = db.getCollection("notes");

  await notes.updateOne(
    { id, userId },
    {
      $set: updatedInfo,
    }
  );

  return await notes.findOne({ id, userId });
};

exports.deleteOne = async (id, userId) => {
  const notes = db.getCollection("notes");

  return await notes.deleteOne({
    id,
    userId,
  });
};

exports.deleteAll = async (userId) => {
  const notes = db.getCollection("notes");

  return await notes.deleteMany({ userId });
};
