const credentialsService = require("../service/credentialsService");
const credentialsRepository = require("../repository/credentialsRepo");

const {
  createCredentialsValidator,
  updateCredentialsValidator,
} = require("../validators/credentialsValidator");

const catchAsync = require("../utils/catchAsync");
exports.createCredential = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const { title, username, password, website } =
    createCredentialsValidator.parse(req.body);
  const result = await credentialsService.createCredential(
    title,
    username,
    password,
    website,
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
  let result = await credentialsRepository.getAllCredentials(userId);

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

  let result = await credentialsService.getOne(id, userId);

  return res.status(200).json({
    status: "success",
    data: {
      ...result,
    },
  });
});

exports.update = catchAsync(async (req, res) => {
  const updatedInfo = updateCredentialsValidator.parse(req.body);
  const id = req.params.id;
  const userId = res.locals.userId;
  let result = await credentialsService.update(userId, updatedInfo, id);

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
  await credentialsService.deleteOne(id, userId);

  return res.status(200).json({
    status: "success",
    message: "Credential deleted successfully",
  });
});

exports.deleteAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  await credentialsService.deleteAll(userId);

  return res.status(200).json({
    status: "success",
    message: "All credentials deleted successfully",
  });
});
