import { Request, Response } from "express";
import { localPoliceServices } from "./LocalPolice.service";


const createLocalPolice= async(req:Request, res:Response)=>{

   try{
     const LocalPoliceData=req.body.localpolice
    const result= await localPoliceServices.createLocalPoliceDB(LocalPoliceData)
    res.status(200).json({
        success:true,
        massege:'LocalPolice Create succesfully',
        data:result
    })
   }catch(err){
    console.log(err)

   }
}
export const LocalPoliceControler={
    createLocalPolice
}