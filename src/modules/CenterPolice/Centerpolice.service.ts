import { CenterPoliceModel } from "./CenterPolice.model"
import { ICenterPolice } from "./CenterPoliceInterface"

const createcenterPoliceDB= async (CenterPolice:ICenterPolice)=>{
   const result= await CenterPoliceModel.create(CenterPolice)
   return result
}
export const centerPoliceServices={
   createcenterPoliceDB 
}