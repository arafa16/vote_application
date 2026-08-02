const express = require("express");
const {
  getDataTable,
  getReportTable,
  getReportDashboard,
  getDataTableAttribute,
} = require("../controllers/status_voting.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const {
  exportDataStatusVoting,
} = require("../controllers/import_export_user.controller");

const router = express.Router();

router.get("/table", verifyToken, getDataTable);
router.get("/table_report", verifyToken, getReportTable);
router.get("/table_attribute", verifyToken, getDataTableAttribute);
router.get("/dashboard_report", verifyToken, getReportDashboard);
router.get("/export", verifyToken, exportDataStatusVoting);

module.exports = router;
