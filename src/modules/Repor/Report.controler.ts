import { Request, Response } from "express";
import { ReportService } from "./Report.service";
import { createReportValidation, updateReportValidation } from "./Report.validation";
import { AuthRequest } from "../../Middelware/auth.middleware";
import { NotificationService } from "../Notification/Notification.service";

// Allowed values
const allowedReportTypes = ["murder", "robbery", "fraud", "assault", "theft", "arson", "other"] as const;
const allowedStatus = ["pending", "reviewed", "resolved", "closed"] as const;

// Helper to parse boolean query params
const parseBoolean = (value?: string) => value?.toLowerCase() === "true";

export const createReport = async (req: Request, res: Response) => {
  try {
    // Expect frontend to send image as URL or base64 string
    const data = {
      ...req.body,
      reportImage: req.body.reportImage, // single string
    };

    const { error, value } = createReportValidation.validate(data);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const result = await ReportService.createReport(value);
 //// 2️⃣ Create notification for this report
if (result?._id && result.reportTitle) {
  await NotificationService.createNotification(
    result._id.toString(),
    `New report created: ${result.reportTitle}`
  );
}
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update report
const updateReport = async (req: Request, res: Response) => {
  try {
    const { error, value } = updateReportValidation.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const result = await ReportService.updateReport(req.params.id, value);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Soft delete report
const softDeleteReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.softDeleteReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Restore report
const restoreReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.restoreReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Block report
const blockReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.blockReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Unblock report
const unblockReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.unblockReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all reports
const getAllReports = async (_req: Request, res: Response) => {
  try {
    const result = await ReportService.getAllReports();
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get report by ID
const getReportById = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.getReportById(req.params.id);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search by reportId
const searchByReportId = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.searchByReportId(req.params.reportId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Search by reporterId
const searchByReporterId = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.searchByReporterId(req.params.reporterId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Search by reportType
const searchByReportType = async (req: Request, res: Response) => {
  try {
    const reportType = req.params.reportType;
    if (!allowedReportTypes.includes(reportType as any))
      return res.status(400).json({ success: false, message: "Invalid reportType" });

    const result = await ReportService.searchByReportType(reportType as typeof allowedReportTypes[number]);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search by status
const searchByStatus = async (req: Request, res: Response) => {
  try {
    const status = req.params.status;
    if (!allowedStatus.includes(status as any))
      return res.status(400).json({ success: false, message: "Invalid status" });

    const result = await ReportService.searchByStatus(status as typeof allowedStatus[number]);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search by isBlocked
const searchIsBlocked = async (req: Request, res: Response) => {
  try {
    const status = parseBoolean(req.query.isblocked as string);
    const result = await ReportService.searchIsBlocked(status);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search by isDeleted
const searchIsDeleted = async (req: Request, res: Response) => {
  try {
    const status = parseBoolean(req.query.isdelete as string);
    const result = await ReportService.searchIsDeleted(status);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Live search by name
const liveSearchByName = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.liveSearchByName(req.query.q as string);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Live search by address
const liveSearchByAddress = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.liveSearchByAddress(req.query.q as string);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const combinedSearch = async (req: Request, res: Response) => {
  try {
    const { reportType, reportTitle, reportLocation } = req.query;

    const result = await ReportService.combinedSearch(
      reportType as string | undefined,
      reportTitle as string | undefined,
      reportLocation as string | undefined
    );

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const searchDeletedByReporterId = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.searchDeletedByReporterId(req.params.reporterId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};



 const verifyReport = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const id = req.params.id;
    const result = await ReportService.verifyReport(id, String(userId));

    if (result.error) {
      switch (result.error) {
        case "invalid_report_id":
        case "invalid_user_id":
          return res.status(400).json({ success: false, message: "Invalid id" });
        case "not_found":
          return res.status(404).json({ success: false, message: "Report not found" });
        case "owner_cannot_verify":
          return res.status(400).json({ success: false, message: "Reporter cannot verify their own report" });
        case "already_verified":
          return res.status(400).json({ success: false, message: "You already verified this report" });
        default:
          return res.status(400).json({ success: false, message: "Unable to verify" });
      }
    }

    // ✅ success
    return res.json({ success: true, data: result.data });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
const assignActionTeams = async (req: Request, res: Response) => {
  try {
    const { actionTeams } = req.body;
    const { id } = req.params;

    if (!Array.isArray(actionTeams) || actionTeams.length === 0) {
      return res.status(400).json({ success: false, message: "No action teams provided" });
    }

    const result = await ReportService.assignActionTeams(id, actionTeams);

    if (result.error) {
      switch (result.error) {
        case "invalid_report_id":
          return res.status(400).json({ success: false, message: "Invalid report id" });
        case "invalid_team_ids":
          return res.status(400).json({ success: false, message: "Invalid team ids" });
        case "not_found":
          return res.status(404).json({ success: false, message: "Report not found" });
        default:
          return res.status(400).json({ success: false, message: "Unable to assign action teams" });
      }
    }

    return res.json({ success: true, data: result.data });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


const getReportsWithActionTaken = async (_req: Request, res: Response) => {
  try {
    const reports = await ReportService.getReportsWithActionTaken();
    res.json({ success: true, data: reports });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};





export const ReportController = {
  createReport,
  updateReport,
  softDeleteReport,
  restoreReport,
  blockReport,
  unblockReport,
  getAllReports,
  getReportById,
  searchByReportId,
  searchByReporterId,
  searchByReportType,
  searchByStatus,
  searchIsBlocked,
  searchIsDeleted,
  liveSearchByName,
  liveSearchByAddress,
  combinedSearch,
  searchDeletedByReporterId,
  verifyReport,
  assignActionTeams,
  getReportsWithActionTaken
};

