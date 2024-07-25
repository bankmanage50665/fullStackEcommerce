const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, requird: true },
  image: { type: String, requird: true },
  brand: { type: String, requird: true },
  category: { type: String, requird: true },
  price: { type: String, requird: true },
  material: { type: String, requird: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
