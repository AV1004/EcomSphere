const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("User already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Please enter password with minimum 8 characters."),
    body("name").trim().not().isEmpty().withMessage("Please enter valid name."),
  ],
  authController.signUp
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("User does not exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Incorrect Password please try again!"),
  ],
  authController.login
);

router.post(
  "/resetPassword",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("User does not exists!");
          }
        });
      })
      .normalizeEmail(),
  ],
  authController.postReset
);

router.post("/setNewPassword", authController.setNewPassword);

router.post(
  "/getUserDetailUsingId",
  [
    body("userId").custom((value, { req }) => {
      return User.findOne({ _id: value }).then((userDoc) => {
        if (!userDoc) {
          return Promise.reject("User does not exists!");
        }
      });
    }),
  ],
  authController.giveUserData
);

module.exports = router;
