import { Schema, model } from "mongoose";
import { IReport } from "./ReportInterface";

const ReportSchema = new Schema<IReport>(
  {
    reportId: { type: String, required: true, unique: true },

    reportTime: { type: Date, default: Date.now },
    reportTitle: { type: String, required: true },
    reportDescription: { type: String },
    reportImage: { type: String },

    // ✅ Reference user instead of storing email/contact
    reporterId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    reportLocation: { type: String },
    reportType: {
      type: String,
      enum: ["crime", "missing", "accident", "other"],
      default: "other",
    },
    informPerson: { type: String },
    informLocalPolice: { type: String },

    isBlocked: { type: Boolean, default: false, index: true },
    isDeleted: { type: Boolean, default: false, index: true },

    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved", "closed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ReportModel = model<IReport>("Report", ReportSchema);
