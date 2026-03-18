const { ObjectId } = require("mongodb");
const repository = require("../repository/passwordRepo");
const catchAsync = require("../utils/catchAsync");

exports.createPassword = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const { title, username, password, website } = req.body;
  const loginPassword = { title, username, password, website };

  const pass = await repository.createPassword(
    userId,
    title,
    username,
    website
  );
  if (!pass) {
    return res.status(400).json({ status: "fail", message: "Invalid inputs" });
  }

  res.status(201).json({
    status: "success",
    data: {
      pass,
      loginPassword,
      userId,
    },
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const userId = res.locals.userId;
  const result = await repository.getAllPasswords(userId);

  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.getOne = catchAsync(async (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const userId = res.locals.userId;

  const result = await repository.findPasswordById(objectId, userId);
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

exports.edit = catchAsync(async (req, res) => {
  const updatedInfo = req.body;
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const userId = res.locals.userId;
  const result = await repository.updatePassword(
    userId,
    { updatedInfo },
    objectId
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
      updatedInfo,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const userId = res.locals.userId;
  const result = await repository.deleteOnePassword(objectId, userId);
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

  const result = await repository.deleteAllPasswords(userId);
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
