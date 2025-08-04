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

    const getRepotById = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.query;

    let result;
    if (reportId) {
      result = await ReportServices.findByReportId(reportId as string);
    } else {
      result = await ReportServices.getallReportDB();
    }

    res.status(200).json({
      success: true,
      message: " single Report retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
   
  }
};

const updateReport = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    const updateData = req.body;

    if (!reportId) {
      return res.status(400).json({ success: false, message: "Report ID is required" });
    }

    const updatedReport = await ReportServices.updateReportByReportId(reportId, updateData);

    if (!updatedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      data: updatedReport,
    });
  } catch (err) {
   console.log(err)
  }
};

export const ReportControler={
    createReport,
    getallReports,
    getRepotById,
    updateReport
}




