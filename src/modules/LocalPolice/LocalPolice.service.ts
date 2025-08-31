import { LocalPoliceStationModel } from "./LocalPolice.model"
import { ILocalPoliceStation } from "./LocalPoliceInterface"


const createLocalPoliceDB= async (localPolice:ILocalPoliceStation)=>{
   const result= await LocalPoliceStationModel.create(localPolice)
   return result
}

const getallLocalPoliceDB = async () => {
  const result = await LocalPoliceStationModel.find()
  return result
}
const findByLocalPoliceId = async (id: string) => {
  return await LocalPoliceStationModel.findOne({ userId: id });
};
const updateLocalpoliceById = async (userId: string, updateData: Partial<ILocalPoliceStation>) => {
  const result = await LocalPoliceStationModel.findOneAndUpdate(
    { userId },        
    updateData,          
    { new: true }         
  );
  return result;
};
const deleteLocalPoliceById = async (userId: string) => {
  const result = await LocalPoliceStationModel.findOneAndDelete({ userId });
  return result;
};

// Soft delete
const softDeleteLocalPoliceById = async (userId: string) => {
  return await LocalPoliceStationModel.findOneAndUpdate(
    { userId },
    { isDeleted: true },
    { new: true }
  );
};

// Restore
const restoreLocalPoliceById = async (userId: string) => {
  return await LocalPoliceStationModel.findOneAndUpdate(
    { userId },
    { isDeleted: false },
    { new: true }
  );
};


// 🔎 Search by Status
const searchByStatus = async (status: string) => {
  return await LocalPoliceStationModel.find({ status });
};

// 🔎 Search by Contact Number
const searchByContactNumber = async (contactNumber: string) => {
  return await LocalPoliceStationModel.find({ contactNumber });
};

// 🔎 Search by isBlocked
const searchByIsBlocked = async (isBlocked: boolean) => {
  return await LocalPoliceStationModel.find({ isBlocked });
};

// 🔎 Search by isDeleted
const searchByIsDeleted = async (isDeleted: boolean) => {
  return await LocalPoliceStationModel.find({ isDeleted });
};

const liveSearchLocalPolice = async (query: string) => {
  return await LocalPoliceStationModel.find({
    $or: [
      { stationName: { $regex: query, $options: "i" } },
      { stationAddress: { $regex: query, $options: "i" } },
    ],
  });
};

export const localPoliceServices={
   createLocalPoliceDB ,
   getallLocalPoliceDB,
   findByLocalPoliceId,
   updateLocalpoliceById,
   deleteLocalPoliceById,
   softDeleteLocalPoliceById,
   restoreLocalPoliceById,
     searchByStatus,
  searchByContactNumber,
  searchByIsBlocked,
  searchByIsDeleted,
  liveSearchLocalPolice
}