const express = require("express");
const {
  body,
  param,
  query
} = require("express-validator");
const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote
} = require("../controllers/note");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

router.get("/", authenticateUser, getNotes);

router.post(
  "/",
  [
    body("title").notEmpty().isLength({
      min: 1,
      max: 100
    }),
    body("content").notEmpty().isLength({
      min: 1,
      max: 10000
    }),
  ],
  authenticateUser,
  createNote
);

router.get(
  "/:id",
  [param("id").isMongoId()],
  authenticateUser,
  getNote
);

router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").optional().notEmpty().isLength({
      min: 1,
      max: 100
    }),
    body("content").optional().notEmpty().isLength({
      min: 1,
      max: 1000
    }),
  ],
  authenticateUser,
  updateNote
);

router.delete(
  "/:id",
  [param("id").isMongoId()],
  authenticateUser,
  deleteNote
);

module.exports = router;