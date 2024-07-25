const bcrypt = require("bcryptjs");
const HttpError = require("../utils/errorModal");
const User = require("../modal/user_modal");

async function signup(req, res, next) {
  const { name, email, password } = req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError(
        "Field to hashed user password, Please try again later.",
        401
      )
    );
  }

  const createdUser = new User({ name, email, password: hashedPassword });
  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Field to created user, Please try again later.", 401)
    );
  }

  return res.status(201).json({ createdUser });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  let findUser = false;
  try {
    findUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Field to login, Please try again later.", 401));
  }

  if (!findUser) {
    return next(
      new HttpError(
        "Couldn't find user with that email, Please first create account.",
        500
      )
    );
  }

  let comparePassword;
  try {
    comparePassword = await bcrypt.compare(findUser.password, password);
  } catch (err) {
    return next(
      new HttpError("Field to varify user, User credintial wrong.", 500)
    );
  }

  res.json({ message: "User login sucessfully.", findUser });
}

module.exports = {
  signup,
  login,
};
