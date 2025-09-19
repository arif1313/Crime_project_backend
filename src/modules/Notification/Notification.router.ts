import { Router } from "express";
import { notificationController } from "./Notification.controller";


const router = Router();

router.post("/", notificationController.createNotification);           // create notification
router.get("/",notificationController.getAllNotifications);           // get all notifications

export const notificationRouter= router;
