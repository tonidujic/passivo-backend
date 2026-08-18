const db = require("../db");
const { parseToDB } = require("../utils/general");

exports.createNotes = async (savedNote) => {
  const notes = db.getCollection("notes");

  return await notes.insertOne(parseToDB(savedNote));
};

exports.getAll = async (userId) => {
  const notes = db.getCollection("notes");

  return await notes.find({ userId }).toArray();
};

exports.findNotesById = async (id, userId) => {
  const notes = db.getCollection("notes");

  return await notes.findOne({
    _id: id,
    userId,
  });
};

exports.update = async (userId, updatedInfo, id) => {
  const notes = db.getCollection("notes");

  await notes.updateOne(
    { _id: id, userId },
    {
      $set: updatedInfo,
    }
  );

  return await notes.findOne({ _id: id, userId });
};

exports.deleteOne = async (id, userId) => {
  const notes = db.getCollection("notes");

  return await notes.deleteOne({
    _id: id,
    userId,
  });
};

exports.deleteAll = async (userId) => {
  const notes = db.getCollection("notes");

  return await notes.deleteMany({ userId });
};
