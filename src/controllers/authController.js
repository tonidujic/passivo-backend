const catchAsync = require("../utils/catchAsync");
const authUtil = require("../utils/authUtil");
const authService = require("../service/authService");
const { signUpSchema } = require("../validators/authValidator");
const { logInSchema } = require("../validators/authValidator");
const { parseFromDB } = require("../utils/general");

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt;
  const decoded = await authService.protect(token);
  res.locals.userId = decoded._id;
  return next();
});

exports.protectedInfo = (req, res) => {
  return res.status(200).json({ message: "Info" });
};

exports.signUp = catchAsync(async (req, res) => {
  const parsed = signUpSchema.parse(req.body);

  let { username, password } = parsed;

  const user = await authService.signUp(username, password);

  const rest = authUtil.sendToken(user, res);
  const result = parseFromDB(rest);
  return res.status(200).json({
    status: "success",
    data: {
      user: result,
    },
  });
});

exports.logIn = catchAsync(async (req, res) => {
  const parsed = logInSchema.parse(req.body);

  const { username, password } = parsed;

  const user = await authService.logIn(username, password);
  const rest = authUtil.sendToken(user, res);
  const result = parseFromDB(rest);

  return res.status(200).json({
    status: "success",
    data: {
      user: result,
    },
  });
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1000,
    httpOnly: true,
  });
  return res.status(200).json({
    message: "User logged out",
  });
};
