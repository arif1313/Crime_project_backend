import { Request, Response } from "express";
import { NotificationService } from "./Notification.service";

// Create a new notification
 const createNotification = async (req: Request, res: Response) => {
  try {
    const { reportId, message } = req.body;
    const notification = await NotificationService.createNotification(reportId, message);
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create notification", error });
  }
};

// Get all notifications
 const getAllNotifications = async (_req: Request, res: Response) => {
  try {
    const notifications = await NotificationService.getAllNotifications();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get notifications", error });
  }
};

// Get notifications for a specific report/user
 const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    const notifications = await NotificationService.getUserNotifications(reportId);
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get user notifications", error });
  }
};

// Mark a notification as read
 const markAsRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const notification = await NotificationService.markAsRead(notificationId);
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to mark notification as read", error });
  }
};

// Delete a notification
 const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    await NotificationService.deleteNotification(notificationId);
    res.status(200).json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete notification", error });
  }
};
export const notificationController={
createNotification,
getAllNotifications
}
