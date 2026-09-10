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

  const user = await authRepository.findUserById(decoded.id);

  if (!user) {
    throw new AppError("Your session is no longer valid. Please log in again", 401);
  }

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

  const token = authUtil.signToken(user.id, false);

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

  const result = await authRepository.findUserByEmail(email);

  if (!result) {
    throw new AppError("Invalid email or password", 400);
  }

  const user = parseFromDB(result);

  return {
    salt: user.salt,
  };
};

exports.logIn = async (email, authKey, remember = false) => {
  if (!email || !authKey) {
    throw new AppError("Invalid email or password", 400);
  }

  const result = await authRepository.findUserByEmail(email);

  if (!result) {
    throw new AppError("Invalid email or password", 400);
  }

  const user = parseFromDB(result);

  const isValid = await bcrypt.compare(authKey, user.authKey);

  if (!isValid) {
    throw new AppError("Invalid email or password", 400);
  }

  const token = authUtil.signToken(user.id, remember);

  return {
    user,
    token,
  };
};

exports.getMe = async (userId) => {
  const result = await authRepository.findUserById(userId);

  if (!result) {
    throw new AppError("User not found", 404);
  }

  return parseFromDB(result);
};

exports.changePassword = async (
  userId,
  currentAuthKey,
  newAuthKey,
  salt,
  privateKey,
  iv
) => {
  let user = await authRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user = parseFromDB(user);

  const isValid = await bcrypt.compare(currentAuthKey, user.authKey);

  if (!isValid) {
    throw new AppError("Current password is incorrect", 400);
  }

  const hashedNewAuthKey = await bcrypt.hash(newAuthKey, 12);

  const updateResult = await authRepository.changePassword(userId, {
    authKey: hashedNewAuthKey,
    salt,
    privateKey,
    iv,
  });

  if (updateResult && updateResult.matchedCount === 0) {
    throw new AppError("User not found", 404);
  }
};
