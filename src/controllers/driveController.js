const catchAsync = require("../utils/catchAsync");
const driveRepository = require("../repository/driveRepo");
const driveUtil = require("../utils/driveUtil");

exports.uploadFile = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const file = req.file;

  if (!file) {
    return res.status(404).send({
      status: "fail",
      message: "File not uploaded",
    });
  }

  const { _id, ...rest } = await driveRepository.uploadFile(userId, file);

  return res.status(200).json({
    status: "success",
    data: rest,
  });
});

exports.getAll = catchAsync(async (req, res) => {
  let result = await driveRepository.getAll();
  if (!result) {
    return res.status(404).send({
      status: "fail",
      message: "File not found",
    });
  }
  return res.status(200).json({
    status: "success",
    data: result.Contents,
  });
});
exports.getOne = catchAsync(async (req, res) => {
  const fileKey = req.params.key;
  const result = await driveRepository.getOne(fileKey);
  if (!result) {
    return res.status(404).send({
      status: "fail",
      message: "File not found",
    });
  }
  res.set("Content-Type", result.ContentType || "application/octet-stream");
  result.Body.pipe(res);
});

exports.renameFile = catchAsync(async (req, res) => {
  const fileKey = req.params.key;
  const renamed = req.body;

  const result = await driveRepository.renameFile(fileKey, renamed);
  if (!result) {
    return res.status(404).send({
      status: "fail",
      message: "File not found",
    });
  }

  return res.status(200).send({
    status: "success",
    data: result,
  });
});
exports.deleteOne = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const fileKey = req.params.key;
  const result = await driveRepository.deleteOne(userId, fileKey);
  if (!result) {
    return res.status(404).send({
      status: "fail",
      message: "File not found",
    });
  }

  return res.status(200).send({
    status: "success",
    message: "File successfully deleted",
  });
});

exports.deleteAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const result = await driveRepository.deleteAll(userId);
  if (result.length === 0) {
    return res.status(404).send({
      status: "fail",
      message: "Files not found",
    });
  }
  return res.status(200).send({
    status: "success",
    message: "All files successfully deleted",
  });
});
