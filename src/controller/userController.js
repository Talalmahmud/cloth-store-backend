import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    let user = await User.findOne({ phone: phone });
    if (user) {
      return res.status(201).json({ message: "User already exists." });
    }
    user = await User.create(req.body);
    return res.status(200).json({ message: "User is created", user });
  } catch (error) {
    const errorMessage = error.message;
    return res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
  }
};

export const loginUser = async (req, res, next) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User number or password is incorrect" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      const token = jwt.sign(
        { id: user._id, phone: user.phone },
        process.env.SECRET_KEY, // Store the secret key in an environment variable
        { expiresIn: "20h" }
      );
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000 * 20,
      });
      return res
        .status(200)
        .json({ message: "User is logged in.", token: token });
    }
    return res
      .status(400)
      .json({ message: "User number or password is incorrect" });
  } catch (error) {
    const errorMessage = error.message;
    return res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
  }
};

export const userLogout = async (req, res, next) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "User is logged out." });
};
