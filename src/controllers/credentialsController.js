const credentialsService = require("../service/credentialsService");
const credentialsRepository = require("../repository/credentialsRepo");

const {
  createCredentialsSchema,
} = require("../validators/credentialsValidator");
const {
  updateCredentialsSchema,
} = require("../validators/credentialsValidator");

const catchAsync = require("../utils/catchAsync");
exports.createCredential = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const parsed = createCredentialsSchema.parse(req.body);
  const { title, username, password, website } = parsed;
  const loginCredential = await credentialsService.createCredential(
    title,
    username,
    password,
    website,
    userId
  );

  return res.status(201).json({
    status: "success",
    data: {
      ...loginCredential,
      userId,
    },
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const result = await credentialsRepository.getAllCredentials(userId);

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

  const result = await credentialsService.getOne(id, userId);
  return res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.update = catchAsync(async (req, res) => {
  const parsed = updateCredentialsSchema.parse(req.body);
  const updatedInfo = parsed;
  const id = req.params.id;
  const userId = res.locals.userId;
  await credentialsService.update(
    userId,
    {
      updatedInfo,
    },
    id
  );
  return res.status(200).json({
    status: "success",
    data: {
      id,
      userId,
      updatedInfo,
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
    message: "All credentias deleted successfully",
  });
});
