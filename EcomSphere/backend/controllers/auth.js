const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const OTP = require("../models/otp");

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.errors);
    const error = new Error(errors.errors[0].msg);
    // Unprocessable Entity!
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const otp = req.body.otp;

  try {
    // Find the most recent OTP for the email and Verify it!
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      console.log(response);
      // console.log(response[0].otp, otp);
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      // Not Found
      err.statusCode = 500;
    }
    next(err);
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const user = new User();
      user.email = email;
      user.name = name;
      user.password = hashedPass;
      return user.save();
    })
    .then((userDoc) => {
      // User Registered!
      res.status(201).json({ message: "User Created!", userId: userDoc._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        // Not Found
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.errors);
    const error = new Error(errors.errors[0].msg);
    // Unprocessable Entity!
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  const { email, password, otp } = req.body;

  try {
    // Find the most recent OTP for the email and Verify it!
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      console.log(response);
      // console.log(response[0].otp, otp);
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      // Not Found
      err.statusCode = 500;
    }
    next(err);
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("User does not exists!");
        error.statusCode = 401;
        next(error);
      }

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Incorrect Password please try again!");
        error.statusCode = 401;
        next(error);
      }
    });
};
