const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");
const { validate } = require("../utils/general");

const {
  signUpValidator,
  logInInitValidator,
  logInValidator,
  changePasswordValidator,
} = require("../validators/authValidator.js");

router.post("/signup", validate(signUpValidator), authController.signUp);

router.post(
  "/login/init",
  validate(logInInitValidator),
  authController.logInInit
);

router.post("/login", validate(logInValidator), authController.logIn);

router.patch(
  "/change-password",
  authController.protect,
  validate(changePasswordValidator),
  authController.changePassword
);

router.post("/logout", authController.logOut);

router.get("/me", authController.protect, authController.getMe);

module.exports = router;
