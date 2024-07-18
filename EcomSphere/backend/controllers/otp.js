const otpGenerator = require("otp-generator");
const OTP = require("../models/otp");
const User = require("../models/user");

exports.sendOTP = async (req, res) => {
  try {
    const { email, isLogin } = req.body;
    if (isLogin === false) {
      // Check if user is already present
      const checkUserPresent = await User.findOne({ email });
      // If user found with provided email
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User is already registered",
        });
      }
    } else {
      // Check if user is register or not
      const checkUserPresent = await User.findOne({ email });
      if (!checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User does not exists!",
        });
      }
    }
    
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
