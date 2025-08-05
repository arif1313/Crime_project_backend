import express from "express"


import { ReportControler } from "./Report.controler"

const router= express.Router()
router.post('/create-report',ReportControler.createReport)
router.get('/',ReportControler.getRepotById)
router.get('/',ReportControler.getallReports)
router.put("/update/:reportId", ReportControler.updateReport);
router.delete('/delete/:reportId', ReportControler.deleteReport);

export const ReportRoutes=router