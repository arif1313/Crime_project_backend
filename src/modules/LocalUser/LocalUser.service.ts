import { ILocalUser } from "./LocalUser.Interface"
import { LocalUserModel } from "./LocalUser.model"
const createLocalUserDB= async (LocalUser:ILocalUser)=>{
   const result= await LocalUserModel.create(LocalUser)
   return result
}
export const LocalUserServices={
   createLocalUserDB 
}