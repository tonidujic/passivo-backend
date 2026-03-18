const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const util = require("util");

exports.verifyToken = util.promisify(jwt.verify);

const signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

exports.sendToken = (user, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
};

exports.passwordHashing = async (password, saltNum) => {
  return await bcrypt.hash(password, saltNum);
};

exports.passwordComparing = async (hashedPassword, password) => {
  return await bcrypt.compare(hashedPassword, password);
};
