const jwt = require("jsonwebtoken");
const { getDB } = require("../db");
const bcrypt = require("bcrypt");
const config = require("./config");
const signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
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
    const decoded = jwt.verify(token, config.JWT_SECRET);

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

  const hashedPassword = await bcrypt.hash(password, 12);

  const db = getDB();
  if (!db) return res.status(500).json({ message: "DB not connected" });
  const users = db.collection("users");

  const user = await users.insertOne({ username, hashedPassword });

  if (user) {
    sendToken({ _id: user.insertedId, username }, req, res);
    console.log(hashedPassword);
  } else {
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
  });
  let equailty = null;
  if (user) {
    equailty = await bcrypt.compare(password, user.hashedPassword);
  } else {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }

  if (!equailty) {
    return res.status(400).json({
      message: "Your username or password are incorrect",
    });
  } else {
    return sendToken(user, req, res);
  }
};

exports.logOut = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1000,
    httpOnly: true,
  });
  res.status(200).json({
    message: "User logged out",
  });
};
