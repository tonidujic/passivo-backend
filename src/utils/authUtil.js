const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const util = require("util");

exports.verifyToken = util.promisify(jwt.verify);

exports.signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

exports.passwordHashing = async (password, saltNum) => {
  return await bcrypt.hash(password, saltNum);
};

exports.passwordComparing = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
