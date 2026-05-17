const express = require("express");
const router = express.Router();
const credentialsController = require("../controllers/credentialsController.js");
const authController = require("../controllers/authController.js");
const {
  createCredentialsValidator,
  updateCredentialsValidator,
} = require("../validators/credentialsValidator.js");
const { validate } = require("../utils/general");

router.post(
  "/",
  authController.protect,
  validate(createCredentialsValidator),
  credentialsController.createCredential
);
router.get("/", authController.protect, credentialsController.getAll);
router.get("/:id", authController.protect, credentialsController.getOne);
router.patch(
  "/:id",
  authController.protect,
  validate(updateCredentialsValidator),
  credentialsController.update
);
router.delete("/:id", authController.protect, credentialsController.deleteOne);
router.delete("/", authController.protect, credentialsController.deleteAll);

module.exports = router;
