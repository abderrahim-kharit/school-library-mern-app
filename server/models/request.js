const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    book: mongoose.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["NEW", "ACCEPTED", "REFUSED"],
      default: "NEW",
    },
    name: String,
    tel: Number,
    cin: String,
    cef: Number,
    email: String,
  },
  {
    timestamps: true,
  }
);

const requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel;
