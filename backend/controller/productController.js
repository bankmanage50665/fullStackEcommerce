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

async function productDetail(req, res, next) {
  const productId = req.params.id;

  let findProduct;
  try {
    findProduct = await Product.findById(productId);
  } catch (err) {
    return next(new HttpError("Field to find product", 500));
  }
  if (!findProduct) {
    return next(new HttpError("Product not found", 404));
  }
  res.json({ message: "Find product sucessfully.", findProduct });
}

async function editProducts(req, res, next) {
  const productId = req.params.id;
  const { name, description, price, image, brand,  category } =
    req.body;

  let findProduct;
  try {
    findProduct = await Product.findById(productId);
  } catch (err) {
    return next(new HttpError("Field to find product", 500));
  }

  findProduct.name = name;
  findProduct.description = description;
  findProduct.price = price;
  findProduct.image = image;
  findProduct.brand = brand;
  findProduct.category = category;

  if (!findProduct) {
    return next(new HttpError("Product not found", 404));
  }

  try {
    await findProduct.save();
  } catch (err) {
    return next(new HttpError("Field to update product.", 500));
  }
  res.json({ message: "Product update sucessfully.", findProduct });
}

module.exports = { createProduct, getAllProducts, productDetail, editProducts };
