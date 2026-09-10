const catchAsync = require("../utils/catchAsync");
const driveService = require("../service/driveService");

exports.createFile = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const { file, fileName, fileType, favorite, iv, key, title } = req.body;
  const result = await driveService.createFile({
    userId,
    fileName,
    fileType,
    file,
    title,
    favorite,
    iv,
    key,
  });
  return res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  let result = await driveService.getAll(userId);

  return res.status(200).json({
    status: "success",
    data: result,
  });
});
exports.getOne = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const fileId = req.params.key;
  const result = await driveService.getOne(userId, fileId);

  return res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.update = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const updatedInfo = req.body;

  const fileId = req.params.key;

  let result = await driveService.update(fileId, updatedInfo, userId);

  return res.status(200).send({
    status: "success",
    data: result,
  });
});
exports.deleteOne = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const fileId = req.params.key;
  await driveService.deleteOne(userId, fileId);

  return res.status(200).send({
    status: "success",
    message: "File successfully deleted",
  });
});

exports.deleteAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  await driveService.deleteAll(userId);

  return res.status(200).send({
    status: "success",
    message: "All files successfully deleted",
  });
});
