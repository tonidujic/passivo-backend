const catchAsync = require("../utils/catchAsync");
const notesService = require("../service/notesService");

exports.createNotes = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const { title, content, favorite } = req.body;

  const result = await notesService.createNotes(
    title,
    content,
    favorite,
    userId
  );

  return res.status(201).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const result = await notesService.getAll(userId);

  return res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.getOne = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = res.locals.userId;

  const result = await notesService.getOne(id, userId);

  return res.status(200).json({
    status: "success",
    data: {
      ...result,
    },
  });
});

exports.update = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = res.locals.userId;

  const updatedInfo = req.body;

  const result = await notesService.update(userId, updatedInfo, id);

  return res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = res.locals.userId;

  await notesService.deleteOne(id, userId);

  return res.status(200).json({
    status: "success",
    message: "Note deleted successfully",
  });
});

exports.deleteAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  await notesService.deleteAll(userId);

  return res.status(200).json({
    status: "success",
    message: "All notes deleted successfully",
  });
});
