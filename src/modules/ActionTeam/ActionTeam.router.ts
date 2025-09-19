// src/modules/ActionTeam/ActionTeam.router.ts
import { Router } from "express";
import { ActionTeamController } from "./ActionTeam.controller";
import { upload } from "../../uploads";

const router = Router();

// ✅ Create
router.post("/create",upload.single("profileImage"), ActionTeamController.createActionTeam);

// ✅ Get All
router.get("/search", ActionTeamController.getAllActionTeams);

// ✅ Get By ID
router.get("/search/:id", ActionTeamController.getActionTeamById);


router.get("/user/:userId", ActionTeamController.searchActionTeamByUserId);

// ✅ Update
router.put("/update/:id", ActionTeamController.updateActionTeamById);

// ✅ Soft Delete
router.delete("/delete/:id", ActionTeamController.softDeleteActionTeamById);

// ✅ Restore
router.patch("/restore/:id", ActionTeamController.restoreActionTeamById);

// ✅ Block
router.patch("/block/:id", ActionTeamController.blockActionTeamById);

// ✅ Unblock
router.patch("/unblock/:id", ActionTeamController.unblockActionTeamById);

// ✅ Live Search
router.get("/search/live", ActionTeamController.liveSearchActionTeam);

// ✅ Search by isDeleted
router.get("/search/deleted", ActionTeamController.searchActionTeamByDeleted);

// ✅ Search by isBlocked
router.get("/search/blocked", ActionTeamController.searchActionTeamByBlocked);

export const ActionTeamRouter = router;
