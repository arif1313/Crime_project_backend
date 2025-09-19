import { Types } from "mongoose";

export interface INotification {
  ReportId: Types.ObjectId;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
