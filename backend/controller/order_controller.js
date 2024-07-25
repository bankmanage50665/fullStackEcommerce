const Order = require("../modal/orderModal");
const HttpError = require("../utils/errorModal");

async function placeOrder(req, res, next) {
  const { userData: user, items } = req.body;

  const createdOrder = new Order({ user, items });

  try {
    await createdOrder.save();
  } catch (err) {
    return next(new HttpError("Field to create order", 500));
  }
  res.json({ message: "Order place sucessfully.", createdOrder });
}

async function getOrders(req, res, next) {
  const orders = await Order.find();
  res.json({ message: "Find orders sucessfully.", orders });
}

module.exports = { placeOrder, getOrders };
