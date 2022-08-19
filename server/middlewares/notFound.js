const notFound = (req, res) => {
  res.status(200).json({ message: "Route not Found" });
};

module.exports = notFound;
