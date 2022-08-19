const notFound = (req, res) => {
  res.status(200).json({ message: "url not found" });
};

module.exports = notFound;
