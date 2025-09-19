import { ReportModel } from "./Report.model";
import { IReport } from "./ReportInterface";
import { Types } from "mongoose";

// Create a new report (reportId auto-generated in model)
const createReport = async (
  payload: Omit<IReport, "_id" | "reportId" | "reportDate" | "reportTime">
): Promise<IReport> => {

  const report = new ReportModel(payload);
  return await report.save();
};

// Update report by ID
const updateReport = async (id: string, payload: Partial<IReport>): Promise<IReport | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ReportModel.findByIdAndUpdate(id, payload, { new: true }).lean();
};

// Soft delete a report
const softDeleteReport = async (id: string): Promise<IReport | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ReportModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).lean();
};

// Restore a soft-deleted report
const restoreReport = async (id: string): Promise<IReport | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ReportModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true }).lean();
};

// Block a report
const blockReport = async (id: string): Promise<IReport | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ReportModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).lean();
};

// Unblock a report
const unblockReport = async (id: string): Promise<IReport | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ReportModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).lean();
};

const getAllReports = async (): Promise<IReport[]> => {
  return await ReportModel.find({ isDeleted: false }).populate("reporterId", "name email").lean();
};

// Get a report by MongoDB ID
const getReportById = async (id: string): Promise<IReport | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ReportModel.findById(id).lean();
};

// Search by reportId
const searchByReportId = async (reportId: string): Promise<IReport[]> => {
  return await ReportModel.find({ reportId }).lean();
};

const searchByReporterId = async (reporterId: string): Promise<IReport[]> => {
  if (!Types.ObjectId.isValid(reporterId)) return [];
  
  // ✅ এখানে শুধু active (non-deleted) reports আনা হবে
  return await ReportModel.find({ reporterId, isDeleted: false }).lean();
};

// Search by reportType
const searchByReportType = async (
  reportType: "murder" | "robbery" | "fraud" | "assault" | "theft" | "arson" | "other"
): Promise<IReport[]> => {
  return await ReportModel.find({ reportType }).lean();
};

// Search by status
const searchByStatus = async (
  status: "pending" | "reviewed" | "resolved" | "closed"
): Promise<IReport[]> => {
  return await ReportModel.find({ status }).lean();
};

// Search blocked/unblocked reports
const searchIsBlocked = async (isBlocked: boolean): Promise<IReport[]> => {
  return await ReportModel.find({ isBlocked }).lean();
};

// Search deleted/non-deleted reports
const searchIsDeleted = async (isDeleted: boolean): Promise<IReport[]> => {
  return await ReportModel.find({ isDeleted }).lean();
};

// Live search by reportTitle
const liveSearchByName = async (keyword: string): Promise<IReport[]> => {
  return await ReportModel.find({
    reportTitle: { $regex: keyword, $options: "i" },
    isDeleted: false,
  }).lean();
};

// Live search by reportLocation
const liveSearchByAddress = async (keyword: string): Promise<IReport[]> => {
  return await ReportModel.find({
    reportLocation: { $regex: keyword, $options: "i" },
    isDeleted: false,
  }).lean();
};
// Report.service.ts 
const combinedSearch = async (
  reportType?: string,
  reportTitle?: string,
  reportLocation?: string
): Promise<IReport[]> => {
  const query: any = { isDeleted: false };

  if (reportType) query.reportType = reportType;
  if (reportTitle) query.reportTitle = { $regex: reportTitle, $options: "i" };
  if (reportLocation) query.reportLocation = { $regex: reportLocation, $options: "i" };

  return await ReportModel.find(query).lean();
};
// Search deleted reports by reporterId
const searchDeletedByReporterId = async (reporterId: string): Promise<IReport[]> => {
  if (!Types.ObjectId.isValid(reporterId)) return [];
  return await ReportModel.find({ reporterId, isDeleted: true }).lean();
};


const verifyReport = async (id: string, userId: string) => {
  if (!Types.ObjectId.isValid(id)) return { error: "invalid_report_id" };
  if (!Types.ObjectId.isValid(userId)) return { error: "invalid_user_id" };

  const report = await ReportModel.findById(id);
  if (!report) return { error: "not_found" };

  // Prevent reporter from verifying their own report
  if (report.reporterId && report.reporterId.toString() === userId.toString()) {
    return { error: "owner_cannot_verify" };
  }

  // Prevent duplicate verifies
  if (report.verifiedBy && report.verifiedBy.some(v => v.toString() === userId.toString())) {
    return { error: "already_verified" };
  }

  const updated = await ReportModel.findByIdAndUpdate(
    id,
    {
      $inc: { varifyNumber: 1 },
      $addToSet: { verifiedBy: userId },
    },
    { new: true }
  ).populate("reporterId", "name email").lean();

  return { data: updated };
};


// ✅ Assign Action Teams
const assignActionTeams = async (reportId: string, teamIds: string[]) => {
  if (!Types.ObjectId.isValid(reportId)) return { error: "invalid_report_id" };

  const report = await ReportModel.findById(reportId);
  if (!report) return { error: "not_found" };

  // teamIds validate
  const validTeamIds = teamIds.filter((id) => Types.ObjectId.isValid(id));
  if (validTeamIds.length === 0) return { error: "invalid_team_ids" };

  // already selected গুলো বাদ দিয়ে নতুন গুলো add হবে
  const updated = await ReportModel.findByIdAndUpdate(
    reportId,
    { $addToSet: { ActionTaken: { $each: validTeamIds } } }, // multiple push without duplicates
    { new: true }
  )
    .populate("reporterId", "name email")
    .lean();

  return { data: updated };
};

// Get all reports that have ActionTaken assigned
const getReportsWithActionTaken = async (): Promise<IReport[]> => {
  return await ReportModel.find({ 
    ActionTaken: { $exists: true, $ne: [] }, // ActionTaken array must exist and not empty
    isDeleted: false
  })
   
    .lean();
};



// Export all service methods
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
  combinedSearch,
  searchDeletedByReporterId,
  verifyReport,
  assignActionTeams,
  getReportsWithActionTaken
};
