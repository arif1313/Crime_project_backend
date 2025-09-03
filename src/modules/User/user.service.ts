import bcrypt from "bcrypt";
import { IUser } from "./UserInterface";
import { UserModel } from "./User.model";

// Type for response without password
export type IUserResponse = Omit<IUser, "password">;

const createUserDB = async (data: IUser): Promise<IUserResponse> => {
  const user = new UserModel(data); // no need to hash here
  const savedUser = await user.save();
  const { password, ...userWithoutPassword } = savedUser.toObject();
  return userWithoutPassword;
};

const getAllUsersDB = async (): Promise<IUserResponse[]> => {
  const users = await UserModel.find({ isDeleted: false }).select("-password"); // exclude deleted users
  return users;
};// Get user by ID
const findUserById = async (id: string): Promise<IUserResponse | null> => {
  const user = await UserModel.findById(id).select("-password");
  return user;
};

const updateUserById = async (id: string, data: Partial<IUser>): Promise<IUserResponse | null> => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true, runValidators: true }
  ).select("-password");

  return updatedUser;
};
const softDeleteUserById = async (id: string): Promise<IUserResponse | null> => {
  const user = await UserModel.findById(id).select("-password");
  if (!user) return null;
  if (user.isDeleted) return user; // already deleted
  user.isDeleted = true;
  await user.save();
  return user.toObject();
};

// Restore user
const restoreUserById = async (id: string): Promise<IUserResponse | null> => {
  const restoredUser = await UserModel.findByIdAndUpdate(
    id,
    { isDeleted: false },
    { new: true }
  ).select("-password");
  return restoredUser;
};

export const UserService = {
  createUserDB,
  getAllUsersDB,
  findUserById,
  updateUserById,
  softDeleteUserById,
  restoreUserById,
};
