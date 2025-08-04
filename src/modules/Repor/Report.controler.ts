import { Request, Response } from "express";
import { ReportServices } from "./Report.service";
import { Query } from "mongoose";



const createReport= async(req:Request, res:Response)=>{

   try{
     const ReportData=req.body.report
    const result= await ReportServices.createReportDB(ReportData)
    res.status(200).json({
        success:true,
        massege:'Report Create succesfully',
        data:result
    })
   }catch(err){
    console.log(err)

   }
}
const getallReports = async (req: Request, res: Response) => {

    try{

    const result = await ReportServices.getallReportDB()
    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully",
      data: result,
    });
    }catch(err){
 
  console.log(err)
    }
}

    
export const ReportControler={
    createReport,
    getallReports
}




