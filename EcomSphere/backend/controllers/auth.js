const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const OTP = require("../models/otp");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new Error(errors[0].msg);
    // Unprocessable Entity!
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const otp = req.body.Otp;

  console.log(email, name, password);
  // Find the most recent OTP for the email
  OTP.find({ email })
    .sort({ createdAt: -1 })
    .limit(1)
    .then((response) => {
      if (response.length === 0 || otp !== response[0].otp) {
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return res.status(200).json({
    success: true,
    message: "The Email is Valid!",
  });
};
