require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");
const fs = require("fs");


const userRouter = require("./routes/user/user_routes");
const HttpError = require("./utils/errorModal");
const productRoutes = require("./routes/products/products_routes");
const orderRouter = require("./routes/user/order_routes");
const adminRouter = require("./routes/user/admin_routes");

const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.wdrbduw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: "http://localhost:65017", // Replace with your frontend's URL
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ),
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // End the request with a 200 status for preflight
  }

  next();
});

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/users", userRouter);
app.use("/products", productRoutes);
app.use("/orders", orderRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(
      req.files.forEach((file) => file.path),
      (err) => {
        console.log(err);
      }
    );
  }

  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({
    message: err.message || "Something went wrong, Please try again later.",
  });
});

const PORT = process.env.PORT || 3000

mongoose
  .connect(url)
  .then((req, res) => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(PORT);
    console.log(err);
  });
