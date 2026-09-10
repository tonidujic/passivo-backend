const catchAsync = require("../utils/catchAsync");
const authService = require("../service/authService");

function getCookieOptions(remember = false) {
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  };

  if (remember) {
    cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
  }

  return cookieOptions;
}

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  const decoded = await authService.protect(token);

  res.locals.userId = decoded.id;

  return next();
});

exports.protectedInfo = (req, res) => {
  return res.status(200).json({
    message: "Info",
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const { fullName, email, salt, payloadAuthKey, publicKey, privateKey, iv } =
    req.body;

  const result = await authService.signUp({
    fullName,
    email,
    salt,
    payloadAuthKey,
    publicKey,
    privateKey,
    iv,
  });

  const { authKey, ...userWithoutAuthKey } = result.user;

  res.cookie("jwt", result.token, getCookieOptions(false));

  return res.status(201).json({
    status: "success",
    data: {
      user: userWithoutAuthKey,
      token: result.token,
      publicKey,
    },
  });
});

exports.logInInit = catchAsync(async (req, res) => {
  const { email } = req.body;

  const result = await authService.logInInit(email);

  return res.status(200).json({
    status: "success",
    data: {
      salt: result.salt,
    },
  });
});

exports.logIn = catchAsync(async (req, res) => {
  const { email, authKey, remember = false } = req.body;

  const result = await authService.logIn(email, authKey, remember);

  res.cookie("jwt", result.token, getCookieOptions(remember));

  return res.status(200).json({
    status: "success",
    data: {
      user: result.user,
      token: result.token,
    },
  });
});

exports.getMe = catchAsync(async (req, res) => {
  const userId = res.locals.userId;

  const user = await authService.getMe(userId);

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.logOut = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return res.status(200).json({
    status: "success",
    message: "User logged out",
  });
};

exports.changePassword = catchAsync(async (req, res) => {
  const { currentAuthKey, newAuthKey, salt, privateKey, iv } = req.body;

  await authService.changePassword(
    res.locals.userId,
    currentAuthKey,
    newAuthKey,
    salt,
    privateKey,
    iv
  );

  return res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});
