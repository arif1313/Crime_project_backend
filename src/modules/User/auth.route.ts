import { Router } from "express";
import { AuthController } from "./auth.controler";


const router = Router();


// Auth routes
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);
export const AuthRoutes = router;
