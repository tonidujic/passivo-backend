const jwt = require("jsonwebtoken");
const { getDB } = require("../db/mongo");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

let token;

const sendToken = (user, req, res) => {
  token = signToken(user._id);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
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

exports.protect = (req, res, next) => {
  token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.protectedInfo = (req, res) => {
  res.status(200).json({ message: "Info" });
};

exports.signUp = async (req, res) => {
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
};

exports.logIn = async (req, res) => {
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
};
