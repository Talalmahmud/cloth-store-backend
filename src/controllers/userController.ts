import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phone } = req.body;
    let user = await User.findOne({ phone: phone });
    if (user) {
      return res.status(201).json({ message: "User already exist." });
    }
    user = await User.create(req.body);
    return res.status(200).json({ message: "User is created", user });
  } catch (error: any) {
    const errorMessage = (error as Error).message;

    return res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
  }
};

export const loginUser: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        process.env.SECRET_KEY as string, // Store the secret key in an environment variable
        { expiresIn: "20h" }
      );
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000 * 20,
      });
      return res.status(200).json({ message: "User is logged.", token: token });
    }
    return res
      .status(400)
      .json({ message: "User number or password is incorrect" });
  } catch (error) {
    const errorMessage = (error as Error).message;

    return res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.cookies("access_token", "");
  return res.status(200).json({ message: "User is logged out." });
};
