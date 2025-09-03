import { Router } from "express";
import { LocalUserControllers } from "./LocalUser.controler";


const router = Router();
router.get("/search/live", LocalUserControllers.liveSearchLocalUsersController);
router.get("/search/contact", LocalUserControllers.searchByContactNumberController);
router.get("/search/isDeleted", LocalUserControllers.searchByIsDeletedController);
router.get("/search/isBlocked", LocalUserControllers.searchByIsBlockedController);


router.post("/create", LocalUserControllers.createLocalUserController);
router.get("/search", LocalUserControllers.getAllLocalUsersController);
router.get("/search/:id", LocalUserControllers.getLocalUserController);
router.put("/update/:id", LocalUserControllers.updateLocalUserController);
router.delete("/delete/:id", LocalUserControllers.softDeleteLocalUserController);
router.patch("/restore/:id", LocalUserControllers.restoreLocalUserController);
router.patch("/block/:id", LocalUserControllers.blockLocalUserController);
router.patch("/unblock/:id", LocalUserControllers.unblockLocalUserController);


export const LocalUserRouters= router;
