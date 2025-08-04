import express from "express"


import { ReportControler } from "./Report.controler"

const router= express.Router()
router.post('/create-report',ReportControler.createReport)
router.post('/',ReportControler.getReports)
export const ReportRoutes=router