const notesRepository = require("../repository/notesRepo");
const AppError = require("../utils/appError");
const { v4: uuidv4 } = require("uuid");

exports.createNotes = async (title, content, favorite, userId) => {
  const notesObj = {
    id: uuidv4(),
    userId,
    title,
    content,
    favorite,
  };

  await notesRepository.createNotes(notesObj);

  return notesObj;
};

exports.getOne = async (id, userId) => {
  const result = await notesRepository.findNotesById(id, userId);

  if (!result) {
    throw new AppError("Note not found", 404);
  }

  return result;
};

exports.getAll = async (userId) => {
  return await notesRepository.getAll(userId);
};

exports.update = async (userId, updatedInfo, id) => {
  const result = await notesRepository.update(userId, updatedInfo, id);

  if (!result) {
    throw new AppError("Note not found", 404);
  }

  return result;
};

exports.deleteOne = async (id, userId) => {
  const result = await notesRepository.deleteOne(id, userId);

  if (result.deletedCount === 0) {
    throw new AppError("Note not found", 404);
  }
};

exports.deleteAll = async (userId) => {
  await notesRepository.deleteAll(userId);
};
