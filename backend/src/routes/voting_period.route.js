const express = require("express");
const {
  getDatas,
  getDataById,
  getDataCommissionerNDirectorById,
  updateDataCommissionerNDirectorById,
  createData,
  updateData,
  deleteData,
  getDataTable,
} = require("../controllers/voting_period.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/datas", verifyToken, getDatas);
router.get("/table", verifyToken, getDataTable);
router.get("/data/:uuid", verifyToken, getDataById);
router.get(
  "/data_commissioner_director",
  verifyToken,
  getDataCommissionerNDirectorById,
);
router.patch(
  "/data_commissioner_director/:uuid",
  verifyToken,
  updateDataCommissionerNDirectorById,
);
router.post("/data", verifyToken, createData);
router.patch("/data/:uuid", verifyToken, updateData);
router.delete("/data/:uuid", verifyToken, deleteData);

module.exports = router;
