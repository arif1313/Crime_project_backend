import express from "express";
import { UserController } from "./User.controler";


const router = express.Router();

// Create first
router.post("/create", UserController.createUser);

router.get("/", UserController.getAllUsers);
router.get("/id/:id", UserController.getUserById);
router.put("/id/:id",UserController.updateUser);
router.delete("/id/:id", UserController.softDeleteUser);
router.patch("/id/:id/restore", UserController.restoreUser);

export const UserRoutes = router;
