import { Router } from "express";
import { ReportController } from "./Report.controler";



const router = Router();
// searches
router.get("/combined/search/", ReportController.combinedSearch);
router.get("/search/reportId/:reportId", ReportController.searchByReportId);
router.get("/search/reporterId/:reporterId", ReportController.searchByReporterId);
router.get("/search/type/:reportType", ReportController.searchByReportType);
router.get("/search/status/:status", ReportController.searchByStatus);
router.get("/search/is-blocked", ReportController.searchIsBlocked);
router.get("/search/is-deleted", ReportController.searchIsDeleted);
// CRUDreportImage
router.post("/create", ReportController.createReport);
router.put("/update/:id", ReportController.updateReport);
router.patch("/delete/:id", ReportController.softDeleteReport);
router.patch("/restore/:id", ReportController.restoreReport);

// block/unblock
router.patch("/block/:id", ReportController.blockReport);
router.patch("/unblock/:id", ReportController.unblockReport);

// get all & by id
router.get("/search", ReportController.getAllReports);
router.get("/search/:id", ReportController.getReportById);




// live search
router.get("/live/name", ReportController.liveSearchByName);
router.get("/live/address", ReportController.liveSearchByAddress);

export const ReportRouter =  router 
