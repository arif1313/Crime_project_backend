// src/modules/CenterPolice/CenterPolice.service.ts
import { Types } from "mongoose";
import { CenterPoliceModel } from "./CenterPolice.model";
import { IUserResponse, UserService } from "../User/user.service";
import { ICenterPolice } from "./CenterPoliceInterface";

export type ICenterPoliceResponse = {
  user: IUserResponse;
  centerPolice: ICenterPolice;
};

export type CreateCenterPoliceInput = Omit<ICenterPolice, "userId"> & {
  userId?: string;
  email?: string;
  contactNumber?: string;
  centerStationName: string;
};

// ✅ Create
const createCenterPoliceDB = async (
  policeData: CreateCenterPoliceInput
): Promise<ICenterPoliceResponse> => {
  let userId: string;
  let user: IUserResponse;

  if (policeData.userId) {
    const foundUser = await UserService.findUserById(policeData.userId.toString());
    if (!foundUser) throw new Error("User not found for given userId");
    userId = foundUser._id!;
    user = foundUser;
  } else {
    const existingUser = await UserService.getAllUsersDB();
    const foundUser = existingUser.find((u) => u.email === policeData.email);

    if (foundUser) {
      userId = foundUser._id!;
      user = foundUser;
    } else {
      const newUser = await UserService.createUserDB({
        name: policeData.centerStationName,
        email: policeData.email || "",
        contactNumber: policeData.contactNumber || "",
        password: "default123",
        role: "centerPolice",
      });
      userId = newUser._id!;
      user = newUser;
    }
  }

  const centerPolice = new CenterPoliceModel({
    ...policeData,
    userId: new Types.ObjectId(userId),
  });

  const saved = await centerPolice.save();

  return { user, centerPolice: saved.toObject() };
};

// ✅ Get All
const getAllCenterPolice = async (): Promise<ICenterPolice[]> => {
  const results = await CenterPoliceModel.find({ isDeleted: false });
  return results.map((s) => s.toObject());
};

// ✅ Get By ID
const getCenterPoliceById = async (id: string): Promise<ICenterPolice | null> => {
  const station = await CenterPoliceModel.findById(id);
  return station ? station.toObject() : null;
};

// ✅ Update
const updateCenterPoliceById = async (
  id: string,
  data: Partial<ICenterPolice>
): Promise<ICenterPolice | null> => {
  const updated = await CenterPoliceModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated ? updated.toObject() : null;
};

// ✅ Soft Delete
const softDeleteCenterPoliceById = async (id: string): Promise<ICenterPolice | null> => {
  const station = await CenterPoliceModel.findById(id);
  if (!station) return null;

  if (station.isDeleted) return station.toObject();

  station.isDeleted = true;
  await station.save();
  return station.toObject();
};

// ✅ Restore
const restoreCenterPoliceById = async (id: string): Promise<ICenterPolice | null> => {
  const restored = await CenterPoliceModel.findByIdAndUpdate(
    id,
    { isDeleted: false },
    { new: true }
  );
  return restored ? restored.toObject() : null;
};

// ✅ Block
const blockCenterPoliceById = async (id: string): Promise<ICenterPolice | null> => {
  const blocked = await CenterPoliceModel.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  return blocked ? blocked.toObject() : null;
};

// ✅ Unblock
const unblockCenterPoliceById = async (id: string): Promise<ICenterPolice | null> => {
  const unblocked = await CenterPoliceModel.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  return unblocked ? unblocked.toObject() : null;
};

// ✅ Live search (centerStationName, centerStationAddress)
const liveSearchCenterPolice = async (keyword: string): Promise<ICenterPolice[]> => {
  const results = await CenterPoliceModel.find({
    $or: [
      { centerStationName: { $regex: keyword, $options: "i" } },
      { centerStationAddress: { $regex: keyword, $options: "i" } },
    ],
    isDeleted: false, 
  });
  return results.map((s) => s.toObject());
};

// ✅ Search by isDeleted
const searchCenterPoliceByDeleted = async (isDeleted: boolean): Promise<ICenterPolice[]> => {
  const results = await CenterPoliceModel.find({ isDeleted });
  return results.map((s) => s.toObject());
};

// ✅ Search by isBlocked
const searchCenterPoliceByBlocked = async (isBlocked: boolean): Promise<ICenterPolice[]> => {
  const results = await CenterPoliceModel.find({ isBlocked, isDeleted: false });
  return results.map((s) => s.toObject());
};
export const CenterPoliceServices = {
  createCenterPoliceDB,
  getAllCenterPolice,
  getCenterPoliceById,
  updateCenterPoliceById,
  softDeleteCenterPoliceById,
  restoreCenterPoliceById,
  blockCenterPoliceById,
  unblockCenterPoliceById,
  liveSearchCenterPolice,
  searchCenterPoliceByDeleted,
  searchCenterPoliceByBlocked
};
