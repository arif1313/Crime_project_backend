import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const result = await AuthService.login(identifier, password);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.logout();
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ same export style
export const AuthController = {
  login,
  logout,
  forgotPassword,
};
