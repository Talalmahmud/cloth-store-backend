import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware: any =
  (requiredRole: string) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied. No token provided." });
      }

      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as JwtPayload;
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
