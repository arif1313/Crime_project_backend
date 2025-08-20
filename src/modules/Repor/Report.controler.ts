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
      message: "Report retrieved successfully",
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
// Soft delete
 const softdeleteReport = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    if (!reportId) {
      return res.status(400).json({ success: false, message: "Report ID is required" });
    }

    const deletedReport = await ReportServices.softdeleteReportByReportId(reportId);
    if (!deletedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    const result = await ReportServices.getallReportDB();
    res.status(200).json({ success: true, message: "Report soft deleted", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete report" });
  }
};

// Restore
 const restoreReport = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    const restoredReport = await ReportServices.restoreReportByReportId(reportId);

    if (!restoredReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, message: "Report restored", data: restoredReport });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to restore report" });
  }
};

export const ReportControler={
    createReport,
 
    getRepotById,
    updateReport,
    softdeleteReport,
    restoreReport
}




