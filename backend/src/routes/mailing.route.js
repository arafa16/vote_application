const express = require("express");
const {
  sendEmailInvitation,
  activationUser,
} = require("../controllers/mailing.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/invitation/:uuid", verifyToken, sendEmailInvitation);
router.get("/activation/:token", activationUser);

module.exports = router;
