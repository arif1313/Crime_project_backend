import { UserModel } from "../User/User.model";
import { IUser } from "../User/UserInterface";
import { CenterPoliceModel } from "./CenterPolice.model";
import { ICenterPolice } from "./CenterPoliceInterface";



// Create CenterPolice + link User
const createCenterPoliceWithUser = async (centerPoliceData: any) => {
  const { email, name, password, contactNumber, centerStationName, ...rest } = centerPoliceData;

  // 1️⃣ Check if user exists
  let user = await UserModel.findOne({ email });

  // 2️⃣ Create user if not exists
  if (!user) {
    const newUser: IUser = {
      name,
      email,
      password,       // You should hash password in real app
      contactNumber,
    } as IUser;

    user = await UserModel.create(newUser);
  }

  // 3️⃣ Create CenterPolice linked to user
  const centerPolice: ICenterPolice = {
    userId: user._id,
    centerStationName,
    ...rest,
  } as ICenterPolice;

  const result = await CenterPoliceModel.create(centerPolice);
  return await result.populate("userId", "name email contactNumber");
};




// 🔹 Create
const createCenterPoliceDB = async (centerPolice: ICenterPolice) => {
  const result = await CenterPoliceModel.create(centerPolice);
  return result;
};

// 🔹 Get all
const getAllCenterPoliceDB = async () => {
  const result = await CenterPoliceModel.find({ isDeleted: false });
  return result;
};

// 🔹 Find by userId
const findByCenterPoliceId = async (userId: string) => {
  return await CenterPoliceModel.findOne({ userId, isDeleted: false });
};

// 🔹 Update by userId
const updateCenterPoliceById = async (
  userId: string,
  updateData: Partial<ICenterPolice>
) => {
  const result = await CenterPoliceModel.findOneAndUpdate(
    { userId, isDeleted: false },
    updateData,
    { new: true }
  );
  return result;
};

// 🔹 Soft delete
const softDeleteCenterPoliceById = async (userId: string) => {
  return await CenterPoliceModel.findOneAndUpdate(
    { userId },
    { isDeleted: true },
    { new: true }
  );
};

// 🔹 Restore
const restoreCenterPoliceById = async (userId: string) => {
  return await CenterPoliceModel.findOneAndUpdate(
    { userId },
    { isDeleted: false },
    { new: true }
  );
};

// 🔹 Live search (centerStationName & centerStationAddress)
const liveSearchCenterPolice = async (query: string) => {
  return await CenterPoliceModel.find({
    $or: [
      { centerStationName: { $regex: query, $options: "i" } },
      { centerStationAddress: { $regex: query, $options: "i" } },
    ],
    isDeleted: false,
  }).limit(10);
};

// 🔹 Search by Status
const searchByStatus = async (status: string) => {
  return await CenterPoliceModel.find({ status, isDeleted: false });
};

// 🔹 Search by Email (through populate of User)
const searchByEmail = async (email: string) => {
  return await CenterPoliceModel.find({ isDeleted: false }).populate({
    path: "userId",
    match: { email },
  });
};

// 🔹 Search by _id
const searchById = async (_id: string) => {
  return await CenterPoliceModel.findOne({ _id, isDeleted: false });
};

// 🔹 Search by userId
const searchByUserId = async (userId: string) => {
  return await CenterPoliceModel.findOne({ userId, isDeleted: false });
};

// 🔹 Search by isBlocked
const searchByIsBlocked = async (isBlocked: boolean) => {
  return await CenterPoliceModel.find({ isBlocked });
};

// 🔹 Search by isDeleted
const searchByIsDeleted = async (isDeleted: boolean) => {
  return await CenterPoliceModel.find({ isDeleted });
};

export const centerPoliceServices = {
  createCenterPoliceDB,
  getAllCenterPoliceDB,
  findByCenterPoliceId,
  updateCenterPoliceById,
  softDeleteCenterPoliceById,
  restoreCenterPoliceById,
  liveSearchCenterPolice,
  searchByStatus,
  searchByEmail,
  searchById,
  searchByUserId,
  searchByIsBlocked,
  searchByIsDeleted,
};
