const crypto = require("crypto");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/user");
const OTP = require("../models/otp");

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.errors);
    const error = new Error(errors.errors[0].msg);
    // Unprocessable Entity!
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
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
      res
        .status(201)
        .json({ message: "User Created!", userId: userDoc._id, success: true });
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
    throw error;
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

  let loadedUser;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("User does not exists!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Incorrect Password please try again!");
        error.statusCode = 401;
        throw error;
      }

      // Here we set JWT token in our server that we can use for authentication!
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        success: true,
        message: "Logged in successfully!",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postReset = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.errors);
    const error = new Error(errors.errors[0].msg);
    // Unprocessable Entity!
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  let userId;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          const error = new Error("User does not exists!");
          error.statusCode = 401;
          throw error;
        }
        userId = user._id;

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(() => {
        transporter.sendMail({
          from: '"EcomSphere🛒" ecomsphere@gmail.com',
          to: req.body.email,
          subject: "Request to change password of EcomSphere🛒",
          html: `<h1>You requested to reset your password</h1>
          <p>Click this <a href="https://ecom-sphere.vercel.app/reset/${userId}/${token}">Reset Password</a> to set a new password.</p>
          `,
        });
      })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Email sent you to reset password.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.setNewPassword = (req, res, next) => {
  const { userId, newPassword, token } = req.body;

  console.log(userId, newPassword, token);

  let resetUser;
  User.findOne({
    _id: userId,
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        const error = new Error("User does not exists or  token is expired!");
        error.statusCode = 401;
        throw error;
      }

      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Password reset successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.giveUserData = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.errors);
    const error = new Error(errors.errors[0].msg);
    // Unprocessable Entity!
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { userId } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user!");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({
        user: user,
        message: "User fetched successfully using userId!",
        success: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
