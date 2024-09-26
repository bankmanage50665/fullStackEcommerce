// const express = require("express");
// const router = express.Router();

// const { check } = require("express-validator");

// const userController = require("../../controller/userController");

// router.post(
//   "/signup",
//   [
//     check("name").not().isEmpty(),
//     check("email").normalizeEmail().isEmail(),
//     check("password").isLength({ min: 5 }),
//   ],
//   userController.signup
// );
// router.post(
//   "/login",
//   [
//     check("email").normalizeEmail().isEmail(),
//     check("password").isLength({ min: 5 }),
//   ],
//   userController.login
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../../controller/userController");
const { check } = require("express-validator");

router.post(
  "/register",
  [check("name").not().isEmpty(), check("phoneNumber").isLength({ min: 10 })],
  userController.register
);
router.post(
  "/sendotp",
  [check("phoneNumber").isLength({ min: 10 })],
  userController.sendOTP
);
router.post(
  "/verify",
  [
    check("phoneNumber").isLength({ min: 10 }),
    check("otp").isLength({ min: 4 }),
  ],
  userController.verifyOtp
);

module.exports = router;
