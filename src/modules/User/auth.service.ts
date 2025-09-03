import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./User.model";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const login = async (identifier: string, password: string) => {
  const user = await UserModel.findOne({
    $or: [{ email: identifier }, { contactNumber: identifier }],
  }).lean();

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const { password: _, ...userObj } = user;

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: userObj };
};


const logout = async () => {
  return { message: "Logged out successfully" };
};

const forgotPassword = async (email: string) => {
  const user = await UserModel.findOne({ email }).lean();
  if (!user) throw new Error("User not found");

  const resetToken = jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  return { resetToken };
};

// ✅ export object style
export const AuthService = {
  login,
  logout,
  forgotPassword,
};
