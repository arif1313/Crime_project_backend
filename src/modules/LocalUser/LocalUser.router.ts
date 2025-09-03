import { Router } from "express";
import { LocalUserControllers } from "./LocalUser.controler";


const router = Router();

router.post("/create", LocalUserControllers.createLocalUserController);
router.get("/search", LocalUserControllers.getAllLocalUsersController);
router.get("/search/:id", LocalUserControllers.getLocalUserController);
router.put("/update/:id", LocalUserControllers.updateLocalUserController);
router.delete("/delete/:id", LocalUserControllers.softDeleteLocalUserController);
router.patch("/restore/:id", LocalUserControllers.restoreLocalUserController);

export const LocalUserRouters= router;
