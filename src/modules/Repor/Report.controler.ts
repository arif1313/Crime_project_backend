import { Request, Response } from "express";
import { ReportServices } from "./Report.service";



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
const getReports = async (req: Request, res: Response) => {

    try{
        const filter: any = {};
if (req.query.status)
     
     filter.status = req.query.status;
    if (req.query.reporterEmail) filter.reporterEmail = req.query.reporterEmail;
    if (req.query.reportType) filter.reportType = req.query.reportType;
    if (req.query.isBlocked !== undefined)
      filter.isBlocked = req.query.isBlocked === "true";
    if (req.query.isDelete !== undefined)
      filter.isDelete = req.query.isDelete === "true";

    const result = await ReportServices.findReportDB(filter);
    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully",
      data: result,
    });
    }catch(err){
 res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: (err as Error).message,
    });
    }
}
export const ReportControler={
    createReport,
    getReports
}


