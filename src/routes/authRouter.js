const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");
const { validate } = require("../utils/general");
const {
  signUpValidator,
  logInInitValidator,
  logInValidator,
} = require("../validators/authValidator.js");

router.post("/signup", validate(signUpValidator), authController.signUp);
router.post(
  "/login/init",
  validate(logInInitValidator),
  authController.logInInit
);
router.post("/login", validate(logInValidator), authController.logIn);
router.post("/logout", authController.logOut);
router.get("/me", authController.protect, authController.getMe);
module.exports = router;
