const express = require("express");
const {
  getDatas,
  getDataById,
  createData,
  getCreateAttributes,
  getUpdateAttributesById,
  updateData,
  deleteData,
  getDataTable,
} = require("../controllers/audit_log.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/datas", verifyToken, getDatas);
router.get("/table", verifyToken, getDataTable);
router.get("/data/:uuid", verifyToken, getDataById);
router.post("/data", verifyToken, createData);
router.get("/create_attributes", verifyToken, getCreateAttributes);
router.get("/update_attributes/:uuid", verifyToken, getUpdateAttributesById);
router.patch("/data/:uuid", verifyToken, updateData);
router.delete("/data/:uuid", verifyToken, deleteData);

module.exports = router;
