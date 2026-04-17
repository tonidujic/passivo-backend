const express = require("express");
const router = express.Router();
const credentialsController = require("../controllers/credentialsController.js");
const authController = require("../controllers/authController.js");

router.post(
  "/",
  authController.protect,
  credentialsController.createCredential
);
router.get("/", authController.protect, credentialsController.getAll);
router.get("/:id", authController.protect, credentialsController.getOne);
router.patch("/:id", authController.protect, credentialsController.update);
router.delete("/:id", authController.protect, credentialsController.deleteOne);
router.delete("/", authController.protect, credentialsController.deleteAll);

module.exports = router;
