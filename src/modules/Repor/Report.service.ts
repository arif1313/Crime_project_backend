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
export const ReportServices={
   createReportDB, getallReportDB,
   findByReportId, updateReportByReportId
}