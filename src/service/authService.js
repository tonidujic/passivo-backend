const authRepository = require("../repository/authRepo");
const AppError = require("../utils/appError");
const authUtil = require("../utils/authUtil");
const config = require("../config");
const bcrypt = require("bcryptjs");
const { parseFromDB } = require("../utils/general");

const { v4: uuidv4 } = require("uuid");

exports.protect = async (token) => {
  if (!token) {
    throw new AppError("You are not logged in", 401);
  }
  const decoded = await authUtil.verifyToken(token, config.JWT_SECRET);
  return decoded;
};

exports.signUp = async (userData) => {
  const authKey = await bcrypt.hash(userData.payloadAuthKey, 12);
  const user = {
    id: uuidv4(),
    fullName: userData.fullName,
    email: userData.email,
    salt: userData.salt,
    authKey,
    publicKey: userData.publicKey,
    privateKey: userData.privateKey,
    iv: userData.iv,
  };
  const token = authUtil.signToken(user.id);

  await authRepository.createUser(user);
  return {
    user,
    token,
    publicKey: user.publicKey,
  };
};

exports.logInInit = async (email) => {
  if (!email) {
    throw new AppError("Invalid email or password", 400);
  }

  let user = parseFromDB(await authRepository.findUserByEmail(email));

  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  return {
    salt: user.salt,
  };
};

exports.logIn = async (email, authKey) => {
  if (!email) {
    throw new AppError("Invalid email or password", 400);
  }
  let user = parseFromDB(await authRepository.findUserByEmail(email));

  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  const isValid = await bcrypt.compare(authKey, user.authKey);

  if (!isValid) {
    throw new AppError("Invalid email or password", 400);
  }

  const token = authUtil.signToken(user.id);

  return {
    user,
    token,
  };
};

exports.getMe = async (userId) => {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
