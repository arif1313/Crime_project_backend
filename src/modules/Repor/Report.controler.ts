import { Request, Response } from "express";
import { ReportService } from "./Report.service";


const createReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.createReport(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.updateReport(req.params.id, req.body);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const softDeleteReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.softDeleteReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const restoreReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.restoreReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const blockReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.blockReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const unblockReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.unblockReport(req.params.id);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllReports = async (_req: Request, res: Response) => {
  try {
    const result = await ReportService.getAllReports();
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getReportById = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.getReportById(req.params.id);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// searches
const searchByReportId = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.searchByReportId(req.params.reportId);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchByReporterId = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.searchByReporterId(req.params.reporterId);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchByReportType = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.searchByReportType(req.params.reportType);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchByStatus = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.searchByStatus(req.params.status);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// isBlocked search
const searchIsBlocked = async (req: Request, res: Response) => {
  try {
    const { isblocked } = req.query;  // query param = isblocked
    const status = isblocked === "true"; // string -> boolean

    const result = await ReportService.searchIsBlocked(status);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// isDeleted search
const searchIsDeleted = async (req: Request, res: Response) => {
  try {
    const { isdelete } = req.query; // query param = isdelete
    const status = isdelete === "true"; // string -> boolean

    const result = await ReportService.searchIsDeleted(status);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// live searches
const liveSearchByName = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.liveSearchByName(req.query.q as string);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const liveSearchByAddress = async (req: Request, res: Response) => {
  try {
    const result = await ReportService.liveSearchByAddress(req.query.q as string);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
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
};
