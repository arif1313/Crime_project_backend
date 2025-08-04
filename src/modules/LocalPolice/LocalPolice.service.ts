import { LocalPoliceStationModel } from "./LocalPolice.model"
import { ILocalPoliceStation } from "./LocalPoliceInterface"


const createLocalPoliceDB= async (localPolice:ILocalPoliceStation)=>{
   const result= await LocalPoliceStationModel.create(localPolice)
   return result
}
export const localPoliceServices={
   createLocalPoliceDB 
}