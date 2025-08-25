import express from "express"


import { ReportControler } from "./Report.controler"

const router= express.Router()
router.post('/create-report',ReportControler.createReport)
router.get('/',ReportControler.getRepotById)

router.put("/update/:reportId", ReportControler.updateReport);

router.delete("/delete/:reportId",ReportControler.softdeleteReport );   // Soft delete
router.patch("/restore/:reportId", ReportControler.restoreReport);
router.get("/search", ReportControler.liveSearchreport);

router.get("/search", ReportControler.searchReportsByType);

router.get("/searchByEmail", ReportControler.searchReportByEmail);
export const ReportRoutes=router