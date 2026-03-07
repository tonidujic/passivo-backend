const { getDB } = require("../db");
const { ObjectId } = require("mongodb");
const repository = require("../repository/passwordRepo");
const catchAsync = require("../utils/catchAsync");

exports.createPassword = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const { title, username, password, website } = req.body;
  const loginPassword = { title, username, password, website };

  const db = getDB();

  const passwords = db.collection("passwords");
  const pass = await repository.createPassword(
    passwords,
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
  const db = getDB();

  const passwords = db.collection("passwords");
  const userId = res.locals.userId;
  const result = await repository.getAllPasswords(passwords, userId);

  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.getOne = catchAsync(async (req, res) => {
  const db = getDB();

  const passwords = db.collection("passwords");
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const userId = res.locals.userId;

  const result = await repository.findPasswordById(passwords, objectId, userId);
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
  const updatedPassword = req.body;
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const userId = res.locals.userId;

  const db = getDB();

  const passwords = db.collection("passwords");

  const result = await repository.updatePassword(
    passwords,
    objectId,
    updatedPassword,
    userId
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
      updatedPassword,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const userId = res.locals.userId;

  const db = getDB();

  const passwords = db.collection("passwords");

  const result = await repository.deleteOnePassword(
    passwords,
    objectId,
    userId
  );
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
  const db = getDB();

  const userId = res.locals.userId;

  const passwords = db.collection("passwords");
  const result = await repository.deleteAllPasswords(passwords, userId);
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
