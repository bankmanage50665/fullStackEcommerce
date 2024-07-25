const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user/user_routes");
const HttpError = require("./utils/errorModal");
const productRoutes = require("./routes/products/products_routes");
const orderRouter = require("./routes/user/order_routes");

const url =
  "mongodb+srv://rahul1234:YaUJqtFam74ZnZvL@cluster0.wdrbduw.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/products", productRoutes);
app.use("/orders", orderRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({
    message: err.message || "Something went wrong, Please try again later.",
  });
});

mongoose
  .connect(url)
  .then((req, res) => {
    app.listen(80);
  })
  .catch((err) => {
    console.log(err);
  });
