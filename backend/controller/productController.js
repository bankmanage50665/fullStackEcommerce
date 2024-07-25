const Product = require("../modal/product_modal");
const HttpError = require("../utils/errorModal");

async function createProduct(req, res, next) {
  const { name, description, image, brand, category, material } = req.body;

  const createdProduct = new Product({
    name,
    description,
    image,
    brand,
    category,
    material,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    return next(
      new HttpError("Field to create new user, Please try again later.", 500)
    );
  }

  res.json({ message: "Product created sucessfully", createdProduct });
}

async function getAllProducts(req, res, next) {
  const allProduct = await Product.find();

  res.json({ message: "Product find sucessfully.", allProduct });
}

module.exports = { createProduct, getAllProducts };
