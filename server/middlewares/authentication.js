const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "EMAIL AND PASSWORD REQUIRED" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "NO USER WITH THIS EMAIL" });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({ user: { email }, token });
  }
  res.status(400).json({ message: "INVALID CREDENTIALS" });
};

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(400).json({ message: "TOKEN REQUIRED" });
  }
  const token = authorization.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).json({
      message: "INVALID TOKEN",
    });
  }
};

module.exports = { login, auth };
