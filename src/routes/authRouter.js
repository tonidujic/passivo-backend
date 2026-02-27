const express = require("express");
const { getDB } = require("../db/mongo");
const router = express.Router();
const jwt = require("jsonwebtoken");

//token sign
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

let token;
//sending signed token
const sendToken = (user, req, res) => {
  token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const db = getDB();
  if (!db) return res.status(500).json({ message: "DB not connected" });
  const users = db.collection("users");

  const user = await users.insertOne({ username, password });

  if (user) sendToken({ _id: user.insertedId, username }, req, res);
  else {
    return res.status(400).json({
      message: "Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Missing username and password",
    });
  }
  const db = getDB();
  const users = db.collection("users");

  const user = await users.findOne({
    username,
    password,
  });

  if (!user) {
    return res.status(400).json({
      message: "Your username or password are incorrect",
    });
  } else {
    return sendToken(user, req, res);
  }
});

module.exports = router;
