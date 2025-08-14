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
  return await LocalUserModel.findOne({ reportId: id });
};
const updateLocalUserById = async (reportId: string, updateData: Partial<ILocalUser>) => {
  const result = await LocalUserModel.findOneAndUpdate(
    { reportId },        
    updateData,          
    { new: true }         
  );
  return result;
};
const deleteLocalUserById = async (reportId: string) => {
  const result = await LocalUserModel.findOneAndDelete({ reportId });
  return result;
};
export const LocalUserServices={
   createLocalUserDB ,getallLocalUserDB,findByLocalUserId,updateLocalUserById,deleteLocalUserById
}