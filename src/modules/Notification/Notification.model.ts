import { Schema, model } from "mongoose";
import { INotification } from "./Notifiction.interfact";


const NotificationSchema = new Schema<INotification>(
  {
    ReportId: { type: Schema.Types.ObjectId, ref: "Report", required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = model<INotification>("Notification", NotificationSchema);
