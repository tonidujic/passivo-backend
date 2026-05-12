const catchAsync = require("../utils/catchAsync");
const authService = require("../service/authService");
const { signUpValidator } = require("../validators/authValidator");
const { logInValidator } = require("../validators/authValidator");
const { logInInitValidator } = require("../validators/authValidator");

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt;

  const decoded = await authService.protect(token);

  res.locals.userId = decoded.id;
  return next();
});

exports.protectedInfo = (req, res) => {
  return res.status(200).json({ message: "Info" });
};

exports.signUp = catchAsync(async (req, res) => {
  let { fullName, email, salt, authKey, publicKey, encryptedPrivateKey, iv } =
    signUpValidator.parse(req.body);

  const result = await authService.signUp({
    fullName,
    email,
    salt,
    authKey,
    publicKey,
    encryptedPrivateKey,
    iv,
  });

  res.cookie("jwt", result.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
  return res.status(201).json({
    status: "success",
    data: {
      ...result.user,
      publicKey,
    },
  });
});

exports.logInInit = catchAsync(async (req, res) => {
  const { email } = logInInitValidator.parse(req.body);

  const result = await authService.logInInit(email);

  return res.status(200).json({
    status: "success",
    data: {
      salt: result.salt,
    },
  });
});

exports.logIn = catchAsync(async (req, res) => {
  const { email, authKey } = logInValidator.parse(req.body);

  const result = await authService.logIn(email, authKey);

  res.cookie("jwt", result.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({
    status: "success",
    data: {
      user: result.user,
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
