const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  ISBN: String,
  title: {
    type: String,
    maxlength: 100,
    minlength: 1,
  },
  summary: String,
  author: String,
  status: {
    type: String,
    enum: ["DISPONIBLE", "LOUE"],
    default: "DISPONIBLE",
  },
  publishAt: Date,
  availableAt: {
    type: Date,
    default: Date.now(),
  },
  image: String,
  request: {
    ref: "request",
    type: mongoose.Types.ObjectId,
  },
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;
