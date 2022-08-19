const Book = require("../models/book");
const Request = require("../models/request");
const path = require("path");
const fs = require("fs");

const getBookByISBN = async (req, res) => {
  if (!req.query.isbn)
    return res.status(404).json({ message: "Please Provide ISBN" });

  try {
    const book = await Book.findOne({ ISBN: req.query.isbn });
    if (!book) return res.status(404).json({ message: "no book!" });
    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) return res.status(404).json({ message: "no book!" });
    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteBook = async (req, res) => {
  try {
    //vérifier s'il y a une demande de location
    const bookRequest = await Request.findOne({
      book: req.params.id,
      status: "ACCEPTED",
    });
    if (bookRequest) {
      return res.status(400).json({
        succes: false,
        message: "can't delete this book, a request exist",
      });
    }
    //vérifier si le livre est loué
    const book = await Book.findOne({ id: req.params.id, status: "LOUE" });
    if (book) {
      return res.status(400).json({ succes: false, message: "book is loue" });
    }
    const { image } = await Book.findOne({ id: req.params.id });
    fs.rmSync(path.join("./public", image));
    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ succes: true, message: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const addBook = async (req, res) => {
  try {
    const cover = req.files["cover"];
    const image = req.body.ISBN + path.extname(cover.name);
    const book = await Book.create({ ...req.body, image });
    const filePath = path.join("./public", image);
    req.files["cover"].mv(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(201).json({ book });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const editBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (req.files) {
      const cover = req.files["cover"];
      const image = req.body.ISBN + path.extname(cover.name);
      const filePath = path.join("./public", image);
      req.files["cover"].mv(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    res.status(200).json({ book });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const returnBook = async (req, res) => {
  try {
    const requestID = await Book.findOne({ _id: req.params.id });
    await Request.findOneAndDelete({ _id: requestID.request });

    const otherRequests = await Request.find({
      book: req.params.id,
      status: "ACCEPTED",
    });
    let bookReq = "";
    if (otherRequests.length) {
      const firstComingRequest = otherRequests.reduce((prev, cur) =>
        new Date(prev.startDate).getTime() < new Date(cur.startDate).getTime()
          ? prev
          : cur
      );
      bookReq = firstComingRequest._id;
    }
    if (bookReq) {
      const book = await Book.findByIdAndUpdate(
        req.params.id,
        { status: "LOUE", availableAt: bookReq.endDate, request: bookReq },
        { new: true }
      );
      res.status(200).json({ book });
    } else {
      const book = await Book.findByIdAndUpdate(
        req.params.id,
        { status: "DISPONIBLE", availableAt: Date.now() },
        { new: true }
      );
      res.status(200).json({ book });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getBookById,
  getBooks,
  addBook,
  deleteBook,
  editBook,
  getBookByISBN,
  returnBook,
};
