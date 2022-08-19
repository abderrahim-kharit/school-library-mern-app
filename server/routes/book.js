const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
  getBooks,
  addBook,
  editBook,
  deleteBook,
  returnBook,
  getBookById,
} = require("../controllers/book");

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", fileUpload({ createParentPath: true }), addBook);
router.patch("/:id", fileUpload({ createParentPath: true }), editBook);
router.patch("/render/:id", returnBook);
router.delete("/:id", deleteBook);

module.exports = router;
