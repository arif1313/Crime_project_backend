import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./User.model";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const AuthService = {
  // ✅ LOGIN
  async login(identifier: string, password: string) {
    // Find user by email or contact number
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { contactNumber: identifier }],
    }).lean(); // plain JS object, no Mongoose doc

    if (!user) throw new Error("User not found");

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // ✅ Remove password safely using destructuring
    const { password: _, ...userObj } = user;

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { token, user: userObj };
  },

  // ✅ LOGOUT
  async logout() {
    // JWT logout = client simply discards token
    return { message: "Logged out successfully" };
  },

  // ✅ FORGOT PASSWORD
  async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) throw new Error("User not found");

    // Generate reset token (15 min expiry)
    const resetToken = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Normally you’d send this via Email/SMS
    return { resetToken };
  },
};
