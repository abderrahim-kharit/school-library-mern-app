const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

userSchema.methods.createJWT = async function () {
  const JWT = await jwt.sign({ email: this.email }, "SECRET.@A");
  return JWT;
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
