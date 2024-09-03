const Order = require("../modal/orderModal");
const HttpError = require("../utils/errorModal");
const User = require("../modal/user_modal");
const { default: mongoose } = require("mongoose");

async function placeOrder(req, res, next) {
  const { userData: user, items } = req.body;
  const creator = "66a50720ab65b60dd709be17"; // This should be dynamically set based on authentication

  const createdOrder = new Order({
    user,
    items,
    creator,
  });

  let findUser;
  try {
    findUser = await User.findById(creator);
    if (!findUser) {
      return next(new HttpError("User not found on order.", 404));
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return next(
      new HttpError("Failed to create order due to user lookup failure.", 500)
    );
  }

  console.log(findUser);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdOrder.save({ session: sess });
    findUser.orders.push(createdOrder);
    await findUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.error("Error creating order:", err);
    return next(new HttpError("Failed to create order.", 500));
  }

  res.json({ message: "Order placed successfully.", createdOrder });
}

async function getOrders(req, res, next) {
  const orders = await Order.find();
  res.json({ message: "Find orders sucessfully.", orders });
}

module.exports = { placeOrder, getOrders };
