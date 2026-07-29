const express = require("express");
const {
  sendEmailInvitation,
  activationUser,
  sendEmailInvitationAll,
} = require("../controllers/mailing.controller");
const {
  getDataTable,
  getDataById,
  updateStatusData,
  deleteData,
  sendEmailById,
} = require("../controllers/email_queue.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/invitation/:uuid", verifyToken, sendEmailInvitation);
router.get("/invitation_all", verifyToken, sendEmailInvitationAll);
router.get("/activation/:token", activationUser);

router.get("/table", verifyToken, getDataTable);
router.get("/data/:uuid", verifyToken, getDataById);
router.patch("/data/:uuid", verifyToken, updateStatusData);
router.delete("/data/:uuid", verifyToken, deleteData);
router.get("/send/:uuid", verifyToken, sendEmailById);

module.exports = router;
