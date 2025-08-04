import { ReportModel } from "./Report.model"
import { IReport } from "./ReportInterface"



const createReportDB= async (Report:IReport)=>{
   const result= await ReportModel.create(Report)
   return result
}
const findReportDB = async (filter = {}) => {
  const result = await ReportModel.find(filter)
  return result
}
export const ReportServices={
   createReportDB ,findReportDB
}