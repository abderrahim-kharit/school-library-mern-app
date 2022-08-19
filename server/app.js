const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require(".//middlewares/notFound");
const { auth, login } = require("./middlewares/authentication");

const { getBookByISBN } = require("./controllers/book");
const { addRequest } = require("./controllers/requests");
const bookRouter = require("./routes/book");
const requestRouter = require("./routes/requests");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

//Admin
app.use("/admin/books", auth, bookRouter);
app.use("/admin/requests", auth, requestRouter);
app.post("/admin/login", login);
//User
app.post("/requests", addRequest);
app.get("/books", getBookByISBN);
//Middlewares
app.use(notFound);
app.use(errorHandler);

//DB Connection

const connectDB = function () {
  try {
    mongoose.connect(MONGO_URI);
    app.listen(PORT, console.log(`LISTENING TO PORT ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

connectDB();
