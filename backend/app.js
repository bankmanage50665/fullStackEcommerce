const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const cors = require("cors");

const UserModel = require("./modal/userModal");
// const userRouter = require("./routes/user/user_routes");
const HttpError = require("./utils/errorModal");
const productRoutes = require("./routes/products/products_routes");
const orderRouter = require("./routes/user/order_routes");

const url =
  "mongodb+srv://rahul1234:FwNCek4vJlYa9I1Y@cluster0.wdrbduw.mongodb.net/newLogin?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"),
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     ),
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200); // End the request with a 200 status for preflight
//   }

//   next();
// });

app.use("/uploads/images", express.static(path.join("uploads", "images")));

// app.use("/users", userRouter);
app.use("/products", productRoutes);
app.use("/orders", orderRouter);

app.use(
  session({
    secret: "some-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new UserModel({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dasbord",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/login/sucess", (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ message: "User login sucessfully.", user: req.user });
  } else {
    res.status(400).json({ message: "Yourn't authorized." });
  }
});

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
