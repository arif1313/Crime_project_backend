import { Types } from "mongoose";
import { LocalPoliceStationModel } from "./LocalPolice.model";
import { IUserResponse, UserService } from "../User/user.service";
import { ILocalPoliceStation } from "./LocalPoliceInterface";

// ✅ Return type
export type ILocalPoliceResponse = {
  user: IUserResponse;
  policeStation: ILocalPoliceStation;
};

// ✅ Input type 
export type CreateLocalPoliceStationInput = Omit<ILocalPoliceStation, "userId"> & {
  userId?: string;
  email?: string;
  contactNumber?: string;
  stationName: string;
};

// ✅ Create Police Station
const createLocalPoliceStationDB = async (
  policeData: CreateLocalPoliceStationInput
): Promise<ILocalPoliceResponse> => {
  let userId: string;
  let user: IUserResponse;

  if (policeData.userId) {
    const foundUser = await UserService.findUserById(policeData.userId.toString());
    if (!foundUser) throw new Error("User not found for given userId");
    userId = foundUser._id!;
    user = foundUser;
  } else {
    const existingUser = await UserService.getAllUsersDB();
    const foundUser = existingUser.find(u => u.email === policeData.email);

    if (foundUser) {
      userId = foundUser._id!;
      user = foundUser;
    } else {
      const newUser = await UserService.createUserDB({
        name: policeData.stationName,
        email: policeData.email || "",
        contactNumber: policeData.contactNumber || "",
        password: "default123",
        role: "localPolice",
      });
      userId = newUser._id!;
      user = newUser;
    }
  }

  const policeStation = new LocalPoliceStationModel({
    ...policeData,
    userId: new Types.ObjectId(userId),
  });

  const savedPolice = await policeStation.save();

  return {
    user,
    policeStation: savedPolice.toObject(),
  };
};

// ✅ Get all police stations (excluding soft deleted)
const getAllLocalPoliceStations = async (): Promise<ILocalPoliceStation[]> => {
  const stations = await LocalPoliceStationModel.find({ isDeleted: false });
  return stations.map(s => s.toObject());
};

// ✅ Get police station by ID
const getLocalPoliceStationById = async (id: string): Promise<ILocalPoliceStation | null> => {
  const station = await LocalPoliceStationModel.findById(id);
  return station ? station.toObject() : null;
};

// ✅ Update police station
const updateLocalPoliceStationById = async (
  id: string,
  data: Partial<ILocalPoliceStation>
): Promise<ILocalPoliceStation | null> => {
  const updated = await LocalPoliceStationModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated ? updated.toObject() : null;
};

// ✅ Soft delete police station
const softDeleteLocalPoliceStationById = async (id: string): Promise<ILocalPoliceStation | null> => {
  const station = await LocalPoliceStationModel.findById(id);
  if (!station) return null;

  if (station.isDeleted) return station.toObject();

  station.isDeleted = true;
  await station.save();

  return station.toObject();
};

// ✅ Restore police station
const restoreLocalPoliceStationById = async (id: string): Promise<ILocalPoliceStation | null> => {
  const restored = await LocalPoliceStationModel.findByIdAndUpdate(
    id,
    { isDeleted: false },
    { new: true }
  );
  return restored ? restored.toObject() : null;
};

// ✅ Live search (stationName, stationAddress)
const liveSearchLocalPoliceStations = async (keyword: string): Promise<ILocalPoliceStation[]> => {
  const results = await LocalPoliceStationModel.find({
    $or: [
      { stationName: { $regex: keyword, $options: "i" } },
      { stationAddress: { $regex: keyword, $options: "i" } },
    ],
  });
  return results.map(s => s.toObject());
};

// ✅ Search by contactNumber
const searchByContactNumber = async (contactNumber: string): Promise<ILocalPoliceStation[]> => {
  const results = await LocalPoliceStationModel.find({ contactNumber });
  return results.map(s => s.toObject());
};

// ✅ Search by isDeleted
const searchByIsDeleted = async (isDeleted: boolean): Promise<ILocalPoliceStation[]> => {
  const results = await LocalPoliceStationModel.find({ isDeleted });
  return results.map(s => s.toObject());
};

// ✅ Search by isBlocked
const searchByIsBlocked = async (isBlocked: boolean): Promise<ILocalPoliceStation[]> => {
  const results = await LocalPoliceStationModel.find({ isBlocked });
  return results.map(s => s.toObject());
};

// ✅ Block police station
const blockLocalPoliceStationById = async (id: string): Promise<ILocalPoliceStation | null> => {
  const blocked = await LocalPoliceStationModel.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  return blocked ? blocked.toObject() : null;
};

// ✅ Unblock police station
const unblockLocalPoliceStationById = async (id: string): Promise<ILocalPoliceStation | null> => {
  const unblocked = await LocalPoliceStationModel.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  return unblocked ? unblocked.toObject() : null;
};

// ✅ Export all services
export const LocalPoliceStationServices = {
  createLocalPoliceStationDB,
  getAllLocalPoliceStations,
  getLocalPoliceStationById,
  updateLocalPoliceStationById,
  softDeleteLocalPoliceStationById,
  restoreLocalPoliceStationById,
  liveSearchLocalPoliceStations,
  searchByContactNumber,
  searchByIsDeleted,
  searchByIsBlocked,
  blockLocalPoliceStationById,
  unblockLocalPoliceStationById,
};
