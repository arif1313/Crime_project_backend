import { CenterPoliceModel } from "./CenterPolice.model"
import { ICenterPolice } from "./CenterPoliceInterface"

const createcenterPoliceDB= async (CenterPolice:ICenterPolice)=>{
   const result= await CenterPoliceModel.create(CenterPolice)
   return result
}

const getalcenterPoliceDB = async () => {
  const result = await CenterPoliceModel.find()
  return result
}
const findByCenterPoliceId = async (id: string) => {
  return await CenterPoliceModel.findOne({ userId: id }); 
};
const updateCenterpoliceById = async (userId: string, updateData: Partial<ICenterPolice>) => {
  const result = await CenterPoliceModel.findOneAndUpdate(
    {  userId, isDeleted: false },        
    updateData,          
    { new: true }         
  );
  return result;
};
// Soft delete
const softdeletecenterPoliceById = async (userId: string) => {
  return await CenterPoliceModel.findOneAndUpdate(
    { userId },
    { isDeleted: true },
    { new: true }
  );
};

// Restore
const restorecenterPoliceById = async (userId: string) => {
  return await CenterPoliceModel.findOneAndUpdate(
    { userId },
    { isDeleted: false },
    { new: true }
  );
};

const liveSearchCenterPolice = async (query: string) => {
  return await CenterPoliceModel.find({
    $or: [
      { centerStationName: { $regex: query, $options: "i" } },
      { centerStationAddress: { $regex: query, $options: "i" } }
    ],
    isDeleted: false
  }).limit(10); // Limit results for performance
};
// 🔹 Search by Status
const searchByStatus = async (status: string) => {
  return await CenterPoliceModel.find({ status });
};

// 🔹 Search by Contact Number
const searchByContactNumber = async (contactNumber: string) => {
  return await CenterPoliceModel.find({ contactNumber });
};

// 🔹 Search by isBlocked
const searchByIsBlocked = async (isBlocked: boolean) => {
  return await CenterPoliceModel.find({ isBlocked });
};

// 🔹 Search by isDeleted
const searchByIsDeleted = async (isDeleted: boolean) => {
  return await CenterPoliceModel.find({ isDeleted });
};
export const centerPoliceServices={
   createcenterPoliceDB ,
   softdeletecenterPoliceById,
   updateCenterpoliceById,
   findByCenterPoliceId,
   getalcenterPoliceDB,
   restorecenterPoliceById,
   liveSearchCenterPolice,
   searchByIsDeleted,
   searchByIsBlocked,
   searchByContactNumber,
   searchByStatus,

}