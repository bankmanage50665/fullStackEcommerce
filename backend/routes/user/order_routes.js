const express = require("express");
const router = express.Router();
const placeController = require("../../controller/order_controller");

router.post("/place", placeController.placeOrder);
router.get("/get", placeController.getOrders);

module.exports = router;
