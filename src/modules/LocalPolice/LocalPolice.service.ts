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
export const localPoliceServices={
   createLocalPoliceDB ,getallLocalPoliceDB,findByLocalPoliceId,updateLocalpoliceById,deleteLocalPoliceById
}