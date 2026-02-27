const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/info", authController.protect, authController.protectedInfo);

module.exports = router;
