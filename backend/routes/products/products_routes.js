const express = require("express");
const router = express.Router();
const fileUpload = require("../../utils/imageUpload");

const productController = require("../../controller/productController");

router.post(
  "/add",
  fileUpload.array("image", 12),
  productController.createProduct
);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/:id", productController.productDetail);
router.patch("/:id", productController.editProducts);

module.exports = router;
