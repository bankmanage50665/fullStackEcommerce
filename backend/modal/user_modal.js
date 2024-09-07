const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: "Product" }],
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
