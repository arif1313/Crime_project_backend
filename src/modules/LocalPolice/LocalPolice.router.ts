import express from "express"

import { LocalPoliceControler } from "./Localpolice.controler"

const router= express.Router()
router.post('/create-localPolice',LocalPoliceControler.createLocalPolice)
router.get('/',LocalPoliceControler.getLocalPoliceById)
router.put("/update/:userId", LocalPoliceControler.updateLocalPolice);
router.delete("/delete/:userId", LocalPoliceControler.softDeleteLocalPolice);  // Soft delete
router.patch("/restore/:userId", LocalPoliceControler.restoreLocalPolice); 

// ✅ Search routes
router.get("/search/status", LocalPoliceControler.searchByStatus);
router.get("/search/contact", LocalPoliceControler.searchByContactNumber);
router.get("/search/isBlocked", LocalPoliceControler.searchByIsBlocked);
router.get("/search/isDeleted", LocalPoliceControler.searchByIsDeleted);
router.get("/search/live", LocalPoliceControler.liveSearchLocalPolice);
export const localPoliceRoutes=router