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


const liveSearchreport = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || q.toString().trim() === "") {
      return res.status(200).json({ success: true, data: [] });
    }

    const results = await ReportServices.liveSearchReport(q as string);

    res.status(200).json({
      success: true,
      message: "Search results",
      data: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};

const searchReportsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    if (!type || type.toString().trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Report type query is required",
      });
    }

    const results = await ReportServices.searchReportsByType(type as string);

    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to search reports by type",
    });
  }
};

const searchReportByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || email.toString().trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Reporter email query is required",
      });
    }

    const results = await ReportServices.searchReportsByEmail(email as string);

    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully by email",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to search reports by email",
    });
  }
};


const searchReportsByContact = async (req: Request, res: Response) => {
  try {
    const { contact } = req.query;

    if (!contact || contact.toString().trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Reporter contact query is required",
      });
    }

    const results = await ReportServices.searchReportsByContact(contact as string);

    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully by contact",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to search reports by contact",
    });
  }
};

const searchReportsByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    if (!status || status.toString().trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Status query is required",
      });
    }

    const results = await ReportServices.searchReportsByStatus(status as string);

    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully by status",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to search reports by status",
    });
  }
};
export const ReportControler={
    createReport,
    getRepotById,
    updateReport,
    softdeleteReport,
    restoreReport,
    liveSearchreport,
    searchReportsByType,
    searchReportByEmail,
    searchReportsByContact,
    searchReportsByStatus
}




