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

module.exports = {
  signup,
};
