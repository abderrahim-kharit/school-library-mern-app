const Request = require("../models/request");
const Book = require("../models/book");

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({});
    res.status(200).json({ requests });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.status(200).json({ request });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const addRequest = async (req, res) => {
  try {
    const book = await Book.findOne({ ISBN: req.body.ISBN });
    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "No Book with this ISBN" });
    }
    req.body.book = book._id;
    const request = await Request.create(req.body);

    res.status(201).json({ request });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const requestHandler = async (req, res) => {
  const { accepted } = req.body;
  const dicision = accepted ? "ACCEPTED" : "REFUSED";
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: dicision },
      { new: true }
    );
    const book = await Book.findOne({ _id: request.book });

    let requestID = request._id;
    if (book.status === "LOUE") {
      requestID = book.request;
    }

    if (dicision === "ACCEPTED") {
      const book = await Book.findByIdAndUpdate(request.book, {
        status: "LOUE",
        availableAt: request.endDate,
        request: requestID,
      });
    }
    res.status(200).json({ request });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAllRequests,
  addRequest,
  getRequestById,
  requestHandler,
};
