import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = (requiredRole) => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Forbidden. Insufficient permissions." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
