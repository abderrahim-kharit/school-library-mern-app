const express = require("express");
const router = express.Router();
const {
  getAllRequests,
  getRequestById,
  requestHandler,
} = require("../controllers/requests");

router.get("/", getAllRequests);
router.get("/:id", getRequestById);
router.patch("/:id", requestHandler);

module.exports = router;
