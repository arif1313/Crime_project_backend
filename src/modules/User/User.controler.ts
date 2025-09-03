import { Request, Response } from "express";
import { IUserResponse, UserService } from "./user.service";
import { createUserValidation } from "./User.validation";
import { IUser } from "./UserInterface";
import { UserModel } from "./User.model";
import bcrypt from "bcrypt";
const createUser = async (req: Request, res: Response) => {
  try {
    const { error } = createUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    const result = await UserService.createUserDB(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersDB();
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get user by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await UserService.findUserById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.updateUserById(req.params.id, req.body);
    if (!result) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.softDeleteUserById(req.params.id);

    if (!result) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (result.isDeleted) {
      return res.status(200).json({ success: true, message: "User already deleted", data: result });
    }

    res.status(200).json({ success: true, message: "User deleted successfully", data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Restore user
const restoreUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.restoreUserById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const UserController = {
  createUser,
getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  restoreUser,
};
