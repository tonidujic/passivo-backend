const authRepository = require("../repository/authRepo");
const AppError = require("../utils/appError");
const authUtil = require("../utils/authUtil");
const config = require("../config");
const { parseFromDB } = require("../utils/general");

const { v4: uuidv4 } = require("uuid");

exports.protect = async (token) => {
  if (!token) {
    throw new AppError("You are not logged in", 401);
  }
  const decoded = await authUtil.verifyToken(token, config.JWT_SECRET);
  return decoded;
};

exports.signUp = async (username, password, userId) => {
  if (!username || !password) {
    throw new AppError("Invalid username or password", 400);
  }

  password = await authUtil.passwordHashing(password, 12);

  const token = authUtil.signToken(userId);
  const user = {
    id: uuidv4(),
    username,
    password,
  };

  const { password: pass, ...userWithoutPassword } = user;

  await authRepository.createUser(user);
  return {
    user: userWithoutPassword,
    token,
  };
};

exports.logIn = async (username, password) => {
  if (!username || !password) {
    throw new AppError("Invalid username or password", 400);
  }

  let user = parseFromDB(await authRepository.findUserByUsername(username));

  const token = authUtil.signToken(user.id);

  if (!user || !(await authUtil.passwordComparing(password, user.password))) {
    throw new AppError("Invalid username or password", 400);
  }
  return {
    user,
    token,
  };
};
