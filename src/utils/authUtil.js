const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const util = require("util");
const { z } = require("zod");

exports.verifyToken = util.promisify(jwt.verify);

const signToken = (_id) => {
  return jwt.sign({ _id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

exports.sendToken = (user, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });

  const { password, ...rest } = user;
  return rest;
};

exports.passwordHashing = async (password, saltNum) => {
  return await bcrypt.hash(password, saltNum);
};

exports.passwordComparing = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.passwordSchema = z
  .string()
  .min(8)
  .regex(/[1-9]/)
  .regex(/[A-Z]/)
  .regex(/[a-z]/)
  .regex(/[^A-Za-z0-9]/);
