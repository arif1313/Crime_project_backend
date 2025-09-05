import { ReportModel } from "./Report.model";
import { IReport } from "./ReportInterface";


// Create
const createReport = async (payload: IReport): Promise<IReport> => {
  const report = new ReportModel(payload);
  return await report.save();
};

// Update
const updateReport = async (id: string, payload: Partial<IReport>): Promise<IReport | null> => {
  return await ReportModel.findByIdAndUpdate(id, payload, { new: true }).lean();
};

// Soft delete
const softDeleteReport = async (id: string): Promise<IReport | null> => {
  return await ReportModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).lean();
};

// Restore
const restoreReport = async (id: string): Promise<IReport | null> => {
  return await ReportModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true }).lean();
};

// Block
const blockReport = async (id: string): Promise<IReport | null> => {
  return await ReportModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).lean();
};

// Unblock
const unblockReport = async (id: string): Promise<IReport | null> => {
  return await ReportModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).lean();
};

// Get all (exclude deleted)
const getAllReports = async (): Promise<IReport[]> => {
  return await ReportModel.find({ isDeleted: false }).lean();
};

// Get by id
const getReportById = async (id: string): Promise<IReport | null> => {
  return await ReportModel.findById(id).lean();
};

// Search by reportId
const searchByReportId = async (reportId: string): Promise<IReport[]> => {
  return await ReportModel.find({ reportId }).lean();
};

// Search by reporterId
const searchByReporterId = async (reporterId: string): Promise<IReport[]> => {
  return await ReportModel.find({ reporterId }).lean();
};

// Search by type
const searchByReportType = async (reportType: string): Promise<IReport[]> => {
  return await ReportModel.find({ reportType }).lean();
};

// Search by status
const searchByStatus = async (status: string): Promise<IReport[]> => {
  return await ReportModel.find({ status }).lean();
};

// Service: ReportService.ts
// Search isBlocked
const searchIsBlocked = async (status: boolean): Promise<IReport[]> => {
  return await ReportModel.find({ isBlocked: status }).lean();
};

// Search isDeleted
const searchIsDeleted = async (status: boolean): Promise<IReport[]> => {
  return await ReportModel.find({ isDeleted: status }).lean();
};


// Live search on name
const liveSearchByName = async (keyword: string): Promise<IReport[]> => {
  return await ReportModel.find({
    reportTitle: { $regex: keyword, $options: "i" },
  }).lean();
};

// Live search on address
const liveSearchByAddress = async (keyword: string): Promise<IReport[]> => {
  return await ReportModel.find({
    reportLocation: { $regex: keyword, $options: "i" },
  }).lean();
};

// ✅ Export as object
export const ReportService = {
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
