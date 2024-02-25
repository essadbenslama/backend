const { LongWithoutOverridesClass } = require("bson");
const User = require("../Model/userModel");
const generateToken = require("../utils/generateToken");

// register new user
// route post/api/users
// public access

const registerUser = async (req, res) => {
  const { name, email, password, profileImage } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "user already exists" });
  }

  const newuser = await User.create({
    name,
    email,
    password,
    profileImage,
    role,
  });

  if (newuser) {
    generateToken(res, newuser._id);
    res.status(201).json({
      _id: newuser._id,
      name: newuser.name,
      email: newuser.email,
      profileImage: newuser.profileImage,
    });
  } else {
    res.status(400).json({ message: "invalid user data" });
  }
};

/// auth
// route post/api/users/auth
//public

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const UserExists = await User.findOne({ email });
  if (!UserExists) {
    res.json({ message: " user does not exist" });
  }
  if (UserExists && (await UserExists.matchedPassword(password))) {
    generateToken(res, UserExists._id);
    res.status(201).json({
      _id: UserExists._id,
      name: UserExists.name,
      email: UserExists.email,
      profileImage: UserExists.profileImage,
      role: UserExists.role,
    });
  } else {
    res.status(401).json({ message: "invalid email or password" });
  }
};

// lougout user
// post/api/users/logout
// private

const logoutUser = async (req, res) => {
  res.cookie("jwt", "");
  res.status(200).json({ message: "user logged out" });
};

module.exports = { registerUser, authUser, logoutUser };
