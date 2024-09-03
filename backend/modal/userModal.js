const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  [
    { name: String },
    { email: String },
    { googleId: String },
    { displayName: String },
  ],
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
