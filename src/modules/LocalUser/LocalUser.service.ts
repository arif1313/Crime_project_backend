import { ILocalUser } from "./LocalUser.Interface"
import { LocalUserModel } from "./LocalUser.model"
const createLocalUserDB= async (LocalUser:ILocalUser)=>{
   const result= await LocalUserModel.create(LocalUser)
   return result
}
const getallLocalUserDB = async () => {
  const result = await LocalUserModel.find()
  return result
}
const findByLocalUserId = async (id: string) => {
  return await LocalUserModel.findOne({ userId: id });
};
const updateLocalUserById = async (userId: string, updateData: Partial<ILocalUser>) => {
  const result = await LocalUserModel.findOneAndUpdate(
    { userId },        
    updateData,          
    { new: true }         
  );
  return result;
};
const softDeleteLocalUserById = async (userId: string) => {
  const result = await LocalUserModel.findOneAndUpdate(
    { userId },
    { isDeleted: true },
    { new: true }
  );
  return result;


};
 


// Restore soft-deleted user (optional)
const restoreLocalUserById = async (userId: string) => {
  const result = await LocalUserModel.findOneAndUpdate(
    { userId },
    { isDeleted: false },
    { new: true }
  );
  return result;
};

// Search by role
const searchByRole = async (role: string) => {
  return await LocalUserModel.find({ role });
};
// Search by status
const searchByStatus = async (status: string) => {
  return await LocalUserModel.find({ status });
};
// Search by isDeleted
const searchByIsDeleted = async (isDeleted: boolean) => {
  return await LocalUserModel.find({ isDeleted });
};
// Search by isBlocked
const searchByIsBlocked = async (isBlocked: boolean) => {
  return await LocalUserModel.find({ isBlocked });
};

const searchByContactNumber = async (contactNumber: string) => {
  const result = await LocalUserModel.find({ contactNumber: contactNumber });
  return result;
};

// Combined Live Search (Name + Location)
const combinedLiveSearch = async (searchTerm: string) => {
  const result = await LocalUserModel.find({
    $or: [
      { firstName: { $regex: searchTerm, $options: "i" } },
      { middleName: { $regex: searchTerm, $options: "i" } },
      { lastName: { $regex: searchTerm, $options: "i" } },
      { currentLocation: { $regex: searchTerm, $options: "i" } },
    ],
  });
  return result;
};

export const LocalUserServices={
   createLocalUserDB ,
   getallLocalUserDB,
   findByLocalUserId,
   updateLocalUserById,
   softDeleteLocalUserById,
   restoreLocalUserById,
     searchByRole,
  searchByStatus,
  searchByIsDeleted,
  searchByIsBlocked,
  searchByContactNumber,
  combinedLiveSearch

}