import { Schema, model } from "mongoose";
import { IReport } from "./ReportInterface";

const generateReportId = () => `RPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const ReportSchema = new Schema<IReport>(
  {
    reportId: { type: String, unique: true },
    reportDate: { type: Date, default: Date.now },
    reportTime: { type: Date, default: Date.now },
    reportTitle: { type: String, required: true },
    reportDescription: { type: String },
    reportImage: { type: String }, // single image
    reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportLocation: { type: String },
    reportType: {
      type: String,
      enum: ["murder", "robbery", "fraud", "assault", "theft", "arson", "other"],
      default: "other",
    },
    informPerson: { type: Boolean, default: false },
    informLocalPolice: { type: Boolean, default: false },
    crimeDate: { type: Date },
    crimeTime: { type: String },
    isBlocked: { type: Boolean, default: false, index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved", "closed"],
      default: "pending",
    },
     varifyNumber: { type: Number, default: 0 },
  verifiedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);

// Auto-generate reportId before save
ReportSchema.pre("save", function (next) {
  if (!this.reportId) this.reportId = generateReportId();
  next();
});

export const ReportModel = model<IReport>("Report", ReportSchema);
