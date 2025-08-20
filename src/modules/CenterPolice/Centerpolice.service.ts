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
export const centerPoliceServices={
   createcenterPoliceDB ,
   softdeletecenterPoliceById,
   updateCenterpoliceById,
   findByCenterPoliceId,
   getalcenterPoliceDB,
   restorecenterPoliceById

}