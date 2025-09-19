import { NotificationModel } from "./Notification.model";
import { Types } from "mongoose";

const createNotification = (reportId: string, message: string) => {
  return NotificationModel.create({ ReportId: new Types.ObjectId(reportId), message });
};

const getAllNotifications = () => {
  return NotificationModel.find().sort({ createdAt: -1 });
};

const getUserNotifications = (reportId: string) => {
  return NotificationModel.find({ ReportId: reportId }).sort({ createdAt: -1 });
};

const markAsRead = (notificationId: string) => {
  return NotificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
};

const deleteNotification = (notificationId: string) => {
  return NotificationModel.findByIdAndDelete(notificationId);
};

// ✅ Export all functions in a single object
export const NotificationService = {
  createNotification,
  getAllNotifications,
  getUserNotifications,
  markAsRead,
  deleteNotification
};
