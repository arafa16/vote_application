const express = require("express");
const {
  getDataTable,
  getReportTable,
  getDataTableAttribute,
} = require("../controllers/status_voting.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/table", verifyToken, getDataTable);
router.get("/table_report", verifyToken, getReportTable);
router.get("/table_attribute", verifyToken, getDataTableAttribute);

module.exports = router;
