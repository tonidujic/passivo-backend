const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/passwordController");
const authController = require("../controllers/authController.js");

router.post("/", authController.protect, passwordController.createPassword);
router.get("/", authController.protect, passwordController.getAll);
router.get("/:id", authController.protect, passwordController.getOne);
router.patch("/:id", authController.protect, passwordController.update);
router.delete("/:id", authController.protect, passwordController.deleteOne);
router.delete("/", authController.protect, passwordController.deleteAll);

module.exports = router;
