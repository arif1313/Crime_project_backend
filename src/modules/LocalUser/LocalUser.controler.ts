import { Request, Response } from "express";
import { LocalUserServices } from "./LocalUser.service";
const createLocalUser= async(req:Request, res:Response)=>{

   try{
   const localUserData = req.body.localuser;;
    const result= await LocalUserServices.createLocalUserDB(localUserData)
    res.status(200).json({
        success:true,
        massege:'localUser Create succesfully',
        data:result
    })
   }catch(err){
    console.log(err)

   }
}
export const LocalUserControler={
    createLocalUser
}