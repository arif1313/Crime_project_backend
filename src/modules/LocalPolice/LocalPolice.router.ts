// src/modules/LocalPoliceStation/LocalPoliceStation.router.ts

import { Router } from "express";
import { LocalPoliceControllers } from "./Localpolice.controler";


const router = Router();

// 🔍 Search Endpoints
router.get("/search/live", LocalPoliceControllers.liveSearchLocalPoliceController);
// router.get("/search/contact", LocalPoliceControllers.);
router.get("/search/isDeleted", LocalPoliceControllers.searchByIsDeletedController);
router.get("/search/isBlocked", LocalPoliceControllers.searchByIsBlockedController);

// 📝 CRUD Endpoints
router.post("/create", LocalPoliceControllers.createLocalPoliceController);
router.get("/search", LocalPoliceControllers.getAllLocalPoliceController);
router.get("/search/:id", LocalPoliceControllers.getLocalPoliceController);
router.put("/update/:id", LocalPoliceControllers.updateLocalPoliceController);
router.delete("/delete/:id", LocalPoliceControllers.softDeleteLocalPoliceController);
router.patch("/restore/:id", LocalPoliceControllers.restoreLocalPoliceController);

// 🚫 Block / ✅ Unblock
router.patch("/block/:id", LocalPoliceControllers.blockLocalPoliceController);
router.patch("/unblock/:id", LocalPoliceControllers.unblockLocalPoliceController);

export const LocalPoliceStationRouters = router;
