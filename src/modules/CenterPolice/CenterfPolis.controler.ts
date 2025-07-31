import { Request, Response } from "express";
import { centerPoliceServices } from "./Centerpolice.service";

const createCenterPolice= async(req:Request, res:Response)=>{

   try{
     const centerPolice=req.body
    const result= centerPoliceServices.createcenterPoliceDB(centerPolice)
    res.status(200).json({
        success:true,
        massege:'centerPolice Create succesfully',
        data:result
    })
   }catch(err){
    console.log(err)

   }
}
export const centerPoliceControler={
    createCenterPolice
}