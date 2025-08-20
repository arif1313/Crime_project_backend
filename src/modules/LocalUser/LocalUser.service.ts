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
export const LocalUserServices={
   createLocalUserDB ,
   getallLocalUserDB,
   findByLocalUserId,
   updateLocalUserById,
   softDeleteLocalUserById,
   restoreLocalUserById

}