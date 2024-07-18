const express = require("express");
const otpController = require("../controllers/otp");
const router = express.Router();
router.post("/send-otp", otpController.sendOTP);
module.exports = router;
