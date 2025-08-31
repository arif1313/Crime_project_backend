import { ReportModel } from "./Report.model"
import { IReport } from "./ReportInterface"



const createReportDB= async (Report:IReport)=>{
   const result= await ReportModel.create(Report)
   return result
}

const getallReportDB = async () => {
  const result = await ReportModel.find()
  return result
}
const findByReportId = async (id: string) => {
  return await ReportModel.findOne({ reportId: id });
};
const updateReportByReportId = async (reportId: string, updateData: Partial<IReport>) => {
  const result = await ReportModel.findOneAndUpdate(
    { reportId },        
    updateData,          
    { new: true }         
  );
  return result;
};
// Soft delete
const softdeleteReportByReportId = async (reportId: string) => {
  return await ReportModel.findOneAndUpdate(
    { reportId },
    { isDeleted: true },
    { new: true }
  );
};

// Restore
const restoreReportByReportId = async (reportId: string) => {
  return await ReportModel.findOneAndUpdate(
    { reportId },
    { isDeleted: false },
    { new: true }
  );
};

const liveSearchReport = async (query: string) => {
  return await ReportModel.find({
    $or: [
      { reportTitle: { $regex: query, $options: "i" } },
      { reportLocation: { $regex: query, $options: "i" } }
    ],
    isDeleted: false
  }).limit(10); // Limit results for performance
};




// Search reports by type
const searchReportsByType = async (reportType: string) => {
  return await ReportModel.find({
    reportType: { $regex: reportType, $options: "i" }, // case-insensitive search
    isDeleted: false, // exclude soft deleted reports
  });
};

const searchReportsByEmail = async (email: string) => {
  return await ReportModel.find({
    reporterEmail: { $regex: email, $options: "i" }, // partial + case-insensitive
    isDeleted: false, // skip deleted
  });
};



// Search reports by reporterContact
const searchReportsByContact = async (contact: string) => {
  return await ReportModel.find({
    reporterContact: { $regex: contact, $options: "i" }, // partial & case-insensitive
    isDeleted: false,
  });
};

// Search reports by status
const searchReportsByStatus = async (status: string) => {
  return await ReportModel.find({
    status: { $regex: status, $options: "i" }, // partial + case-insensitive
    isDeleted: false,
  });
};
//combine search
const searchReportsCombine = async (filters: {
  reportType?: string;
  reporterEmail?: string;
  reporterContact?: string;
  status?: string;
}) => {
  const query: any = { isDeleted: false };

  if (filters.reportType) {
    query.reportType = { $regex: filters.reportType, $options: "i" };
  }

  if (filters.reporterEmail) {
    query.reporterEmail = { $regex: filters.reporterEmail, $options: "i" };
  }

  if (filters.reporterContact) {
    query.reporterContact = { $regex: filters.reporterContact, $options: "i" };
  }

  if (filters.status) {
    query.status = { $regex: filters.status, $options: "i" };
  }

  return await ReportModel.find(query);
};

export const ReportServices={
   createReportDB, 
   getallReportDB,
   findByReportId,
    updateReportByReportId,
   softdeleteReportByReportId,
   restoreReportByReportId,
   liveSearchReport,
   searchReportsByType,
   searchReportsByEmail,
   searchReportsByContact,
   searchReportsByStatus,
   searchReportsCombine
}