import { Types } from "mongoose";
import { LocalUserModel, } from "./LocalUser.model";
import { IUserResponse, UserService } from "../User/user.service";
import { ILocalUser } from "./LocalUser.Interface";

// Type for return
export type ILocalUserResponse = {
  user: IUserResponse;  // password removed
  localUser: ILocalUser;
};

// Input type: userId optional
export type CreateLocalUserInput = Omit<ILocalUser, "userId"> & Partial<IUserResponse> & { userId?: string };

 const createLocalUserDB = async (
  localData: CreateLocalUserInput
): Promise<ILocalUserResponse> => {
  let userId: string;
  let user: IUserResponse;

  if (localData.userId) {
    const foundUser = await UserService.findUserById(localData.userId);
    if (!foundUser) throw new Error("User not found for given userId");
    userId = foundUser._id!;
    user = foundUser;
  } else {
    const existingUser = await UserService.getAllUsersDB();
    const foundUser = existingUser.find(u => u.email === localData.email);

    if (foundUser) {
      userId = foundUser._id!;
      user = foundUser;
    } else {
      const newUser = await UserService.createUserDB({
        name: localData.firstName + " " + (localData.lastName || ""),
        email: localData.email || "",
        contactNumber: localData.contactNumber || "",
        password: "default123",
        role: "localUser",
      });
      userId = newUser._id!;
      user = newUser;
    }
  }

  // ✅ Create LocalUser
  const localUser = new LocalUserModel({
    ...localData,
    userId: new Types.ObjectId(userId),
  });

  const savedLocalUser = await localUser.save();

  return {
    user,  // ensure this is not null
    localUser: savedLocalUser.toObject(),
  };
};
// ✅ Get all LocalUsers (excluding soft-deleted)
const getAllLocalUsers = async (): Promise<ILocalUser[]> => {
  const localUsers = await LocalUserModel.find({ isDeleted: false });
  return localUsers.map(u => u.toObject());
};

// Other CRUD operations
const getLocalUserById = async (id: string): Promise<ILocalUser | null> => {
  const localUser = await LocalUserModel.findById(id);
  return localUser ? localUser.toObject() : null;
};

// ✅ Update LocalUser by ID
const updateLocalUserById = async (id: string, data: Partial<ILocalUser>): Promise<ILocalUser | null> => {
  const updated = await LocalUserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  return updated ? updated.toObject() : null;
};
const softDeleteLocalUserById = async (id: string): Promise<ILocalUser | null> => {
  const localUser = await LocalUserModel.findById(id);
  if (!localUser) return null;

  // Already deleted
  if (localUser.isDeleted) return localUser.toObject();

  localUser.isDeleted = true;
  await localUser.save();

  return localUser.toObject();
};

const restoreLocalUserById = async (id: string): Promise<ILocalUser | null> => {
  const restored = await LocalUserModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
  return restored ? restored.toObject() : null;
};

// Export all methods as object
export const LocalUserServices = {
  createLocalUserDB,
  getLocalUserById,
  updateLocalUserById,
  softDeleteLocalUserById,
  restoreLocalUserById,
  getAllLocalUsers
};
