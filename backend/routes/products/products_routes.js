const express = require("express");
const router = express.Router();

const productController = require("../../controller/productController");

router.post("/add", productController.createProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/:id", productController.productDetail);

module.exports = router;
