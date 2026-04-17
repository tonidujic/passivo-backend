const express = require("express");
const router = express.Router();
const driveController = require("../controllers/driveController");
const authController = require("../controllers/authController.js");
const driveUtil = require("../utils/driveUtil");

router.post(
  "/",
  authController.protect,
  driveUtil.upload.single("file"),
  driveController.createFile
);
router.get("/", authController.protect, driveController.getAll);
router.get("/:key", authController.protect, driveController.getOne);
router.patch("/:key", authController.protect, driveController.update);
router.delete("/:key", authController.protect, driveController.deleteOne);
router.delete("/", authController.protect, driveController.deleteAll);

module.exports = router;
