const { v4: uuidv4 } = require("uuid");
const config = require("../config");
const userRepository = require("../repository/userRepo");
const catchAsync = require("../utils/catchAsync");
const authUtil = require("../utils/authUtil");

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in",
    });
  }
  const decoded = await authUtil.verifyToken(token, config.JWT_SECRET);
  res.locals.userId = decoded.id;
  return next();
});

exports.protectedInfo = (req, res) => {
  res.status(200).json({ message: "Info" });
};

exports.signUp = async (req, res) => {
  let { username, password } = req.body;

  password = await authUtil.passwordHashing(password, 12);

  const user = {
    id: uuidv4(),
    username,
    password,
  };
  await userRepository.createUser(user);

  if (user) {
    return authUtil.sendToken(user, res);
  }

  return res.status(400).json({
    status: "fail",
    message: "Error",
  });
};

exports.logIn = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Missing username and password",
    });
  }

  const user = await userRepository.findUserByUsername(username);

  if (!user || (await !authUtil.passwordComparing(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid username or password",
    });
  }
  return authUtil.sendToken(user, res);
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1000,
    httpOnly: true,
  });
  res.status(200).json({
    message: "User logged out",
  });
};
