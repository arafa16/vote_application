const express = require("express");
const {
  getDatas,
  getDataById,
  createDataAttributes,
  updateDataByIdAttributes,
  createData,
  updateData,
  deleteData,
  getDataTable,
} = require("../controllers/director_candidate.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/datas", verifyToken, getDatas);
router.get("/table", verifyToken, getDataTable);
router.get("/data/:uuid", verifyToken, getDataById);
router.get("/create_attributes", verifyToken, createDataAttributes);
router.get("/update_attributes/:uuid", verifyToken, updateDataByIdAttributes);
router.post("/data", verifyToken, createData);
router.patch("/data/:uuid", verifyToken, updateData);
router.delete("/data/:uuid", verifyToken, deleteData);

module.exports = router;
