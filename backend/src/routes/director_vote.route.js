const express = require("express");
const {
  getDatas,
  getDataById,
  createData,
  updateData,
  deleteData,
  getDataTable,
  getDataByUserNPeriod,
} = require("../controllers/director_vote.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const {
  voteSecurity,
  voteDirectorCheckBeforeSubmit,
} = require("../middleware/vote.middleware");

const router = express.Router();

router.get("/datas", verifyToken, getDatas);
router.get("/table", verifyToken, getDataTable);
router.get("/data/:uuid", verifyToken, getDataById);
router.post("/data", verifyToken, voteDirectorCheckBeforeSubmit, createData);
router.patch("/data/:uuid", verifyToken, updateData);
router.delete("/data/:uuid", verifyToken, deleteData);
router.get(
  "/data_user_period/:user_uuid/:voting_period_uuid",
  verifyToken,
  voteSecurity,
  getDataByUserNPeriod,
);

module.exports = router;
