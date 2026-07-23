const express = require("express");
const { sendEmailReset } = require("../controllers/mailing.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/user_reset/:uuid", verifyToken, sendEmailReset);

module.exports = router;
