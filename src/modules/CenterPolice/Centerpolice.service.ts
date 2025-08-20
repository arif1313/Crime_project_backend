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
    { userId },        
    updateData,          
    { new: true }         
  );
  return result;
};
const deletecenterPoliceById = async (userId: string) => {
  const result = await CenterPoliceModel.findOneAndDelete({ userId });
  return result;
};
export const centerPoliceServices={
   createcenterPoliceDB ,
   deletecenterPoliceById,
   updateCenterpoliceById,
   findByCenterPoliceId,
   getalcenterPoliceDB

}