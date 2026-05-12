const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

router.post("/signup", authController.signUp);
router.post("/login/init", authController.logInInit);
router.post("/login", authController.logIn);
router.post("/logout", authController.logOut);

module.exports = router;
