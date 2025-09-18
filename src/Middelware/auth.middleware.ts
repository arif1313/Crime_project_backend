import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request for this project
export interface AuthRequest extends Request {
  user?: {
    _id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as AuthRequest["user"];

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized or invalid token" });
  }
};
