const { v4: uuidv4 } = require("uuid");
const passwordRepository = require("../repository/passwordRepo");
const catchAsync = require("../utils/catchAsync");

exports.createPassword = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const { title, username, password, website } = req.body;
  const user = { id: uuidv4(), userId, title, username, password, website };
  const pass = await passwordRepository.createPassword(user);
  if (!pass) {
    return res.status(400).json({ status: "fail", message: "Invalid inputs" });
  }
  const loginPassword = { title, username, password, website };

  res.status(201).json({
    status: "success",
    data: {
      id: user.id,
      ...loginPassword,
      userId,
    },
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const result = await passwordRepository.getAllPasswords(userId);

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

  const result = await passwordRepository.findPasswordById(id, userId);
  if (result === null) {
    return res.status(404).json({
      status: "fail",
      message: "Password not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.update = catchAsync(async (req, res) => {
  const updatedInfo = req.body;
  const id = req.params.id;
  const userId = res.locals.userId;
  const result = await passwordRepository.updatePassword(
    userId,
    {
      updatedInfo,
    },
    id
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Document was not found",
    });
  }

  res.status(200).json({
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
  const result = await passwordRepository.deleteOnePassword(id, userId);
  if (result.deletedCount === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Document was not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Password deleted successfully",
  });
});

exports.deleteAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const result = await passwordRepository.deleteAllPasswords(userId);
  if (result.deletedCount === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Document was not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "All passwords deleted successfully",
  });
});
