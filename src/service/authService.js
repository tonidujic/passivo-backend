const userRepository = require("../repository/userRepo");
const AppError = require("../utils/appError");
const authUtil = require("../utils/authUtil");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");

exports.protect = async (token) => {
  if (!token) {
    throw new AppError("You are not logged in", 401);
  }
  const decoded = await authUtil.verifyToken(token, config.JWT_SECRET);
  return decoded;
};

exports.signUp = async (username, password) => {
  if (!username || !password) {
    throw new AppError("Invalid username or password", 400);
  }

  password = await authUtil.passwordHashing(password, 12);

  const user = {
    id: uuidv4(),
    username,
    password,
  };
  await userRepository.createUser(user);
  return user;
};

exports.logIn = async (username, password) => {
  if (!username || !password) {
    throw new AppError("Invalid username or password", 400);
  }

  const user = await userRepository.findUserByUsername(username);

  if (!user || !(await authUtil.passwordComparing(password, user.password))) {
    throw new AppError("Invalid username or password", 400);
  }
  return user;
};
