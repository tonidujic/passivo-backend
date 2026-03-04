const jwt = require("jsonwebtoken");
const { getDB } = require("../db");
const bcrypt = require("bcrypt");
const config = require("../config");
const respository = require("../respository");
const util = require("util");

const verifyAsync = util.promisify(jwt.verify);

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
    data: {
      user,
      token,
    },
  });
};

exports.protect = async (req, res, next) => {
  token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in",
    });
  }

  try {
    const decoded = await verifyAsync(token, config.JWT_SECRET);

    res.locals.userId = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

exports.protectedInfo = (req, res) => {
  res.status(200).json({ message: "Info" });
};

exports.signUp = async (req, res) => {
  let { username, password } = req.body;

  password = await bcrypt.hash(password, 12);

  const db = getDB();
  if (!db)
    return res.status(500).json({
      status: "fail",
      message: "DB not connected",
    });
  const users = db.collection("users");

  const user = await respository.createUser(users, username, password);

  if (user) {
    sendToken({ _id: user.insertedId, username }, req, res);
  } else {
    return res.status(400).json({
      status: "fail",
      message: "Error",
    });
  }
};

exports.logIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Missing username and password",
    });
  }
  const db = getDB();
  const users = db.collection("users");

  const user = await respository.findUserByUsername(users, username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid username or password",
    });
  }
  return sendToken(user, req, res);
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
