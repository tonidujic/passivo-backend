const express = require("express");
const router = express.Router();
const driveController = require("../controllers/driveController");
const authController = require("../controllers/authController.js");
const {
  uploadFileValidator,
  renameFileValidator,
} = require("../validators/driveValidator.js");
const { validate } = require("../utils/general");

router.post(
  "/",
  authController.protect,
  validate(uploadFileValidator),
  driveController.createFile
);
router.get("/", authController.protect, driveController.getAll);
router.get("/:key", authController.protect, driveController.getOne);
router.patch(
  "/:key",
  authController.protect,
  validate(renameFileValidator),
  driveController.update
);
router.delete("/:key", authController.protect, driveController.deleteOne);
router.delete("/", authController.protect, driveController.deleteAll);

module.exports = router;
