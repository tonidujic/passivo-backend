const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController.js");
const authController = require("../controllers/authController.js");
const { validate } = require("../utils/general");
const {
  createNotesValidator,
  updateNotesValidator,
} = require("../validators/notesValidator.js");
router.post(
  "/",
  authController.protect,
  validate(createNotesValidator),
  notesController.createNotes
);
router.get("/", authController.protect, notesController.getAll);
router.patch(
  "/:id",
  authController.protect,
  validate(updateNotesValidator),
  notesController.update
);

router.get("/:id", authController.protect, notesController.getOne);
router.delete("/:id", authController.protect, notesController.deleteOne);
router.delete("/", authController.protect, notesController.deleteAll);

module.exports = router;
