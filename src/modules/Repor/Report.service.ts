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

export const ReportServices={
   createReportDB ,getallReportDB
}