const express = require("express");
const router = express.Router();
const driveController = require("../controllers/driveController");
const authController = require("../controllers/authController.js");

router.post("/", authController.protect, driveController.uploadFile);
router.get("/", authController.protect, driveController.getAll);
router.get("/:id", authController.protect, driveController.getOne);
router.patch("/:id", authController.protect, driveController.renameFile);
router.delete("/:id", authController.protect, driveController.deleteOne);
router.delete("/", authController.protect, driveController.deleteAll);

module.exports = router;
