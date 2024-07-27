const express = require("express");
const router = express.Router();
const fileUpload = require("../../utils/imageUpload");
const authCheck = require("../../middleware/authCheck");

const productController = require("../../controller/productController");

router.get("/getAllProducts", productController.getAllProducts);
router.get("/:id", productController.productDetail);

router.use(authCheck);

router.post(
  "/add",
  fileUpload.array("image", 12),
  productController.createProduct
);
router.patch("/:id", productController.editProducts);

module.exports = router;
