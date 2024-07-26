const express = require("express");
const router = express.Router();
const userController = require("../../controller/userController");
const fileUpload = require("../../utils/imageUpload");

router.post("/signup", fileUpload.any("image", 12), userController.signup);
router.post("/login", userController.login);

module.exports = router;
