const catchAsync = require("../utils/catchAsync");
const driveService = require("../service/driveService");
const { parseFromDB } = require("../utils/general");
const { parseManyFromDB } = require("../utils/general");

const {
  uploadFileValidator,
  renameFileSchema,
} = require("../validators/driveValidator");

exports.uploadFile = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const file = uploadFileValidator.parse(req.file);

  let result = await driveService.uploadFile(userId, file);
  result = parseFromDB(result);
  return res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  let result = await driveService.getAll(userId);
  result = parseManyFromDB(result);

  return res.status(200).json({
    status: "success",
    data: result,
  });
});
exports.getOne = catchAsync(async (req, res) => {
  const fileKey = req.params.key;
  const result = await driveService.getOne(fileKey);
  res.set("Content-Type", result.ContentType || "application/octet-stream");
  result.Body.pipe(res);
});

exports.renameFile = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const { fileName } = renameFileSchema.parse(req.body);

  const fileKey = req.params.key;

  let result = await driveService.renameFile(fileKey, fileName, userId);

  return res.status(200).send({
    status: "success",
    data: result,
  });
});
exports.deleteOne = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const fileKey = req.params.key;
  await driveService.deleteOne(userId, fileKey);

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
