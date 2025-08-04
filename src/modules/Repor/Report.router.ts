import express from "express"


import { ReportControler } from "./Report.controler"

const router= express.Router()
router.post('/create-report',ReportControler.createReport)
router.get('/',ReportControler.getallReports)
export const ReportRoutes=router