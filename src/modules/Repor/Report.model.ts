import mongoose, { model, Schema } from 'mongoose'
import { IReport } from './ReportInterface'

const ReportSchema = new Schema<IReport>(
  {
    reportId: { type: String, required: true, unique: true },
    reportTime: { type: Date, default: Date.now },
    reportTitle: { type: String, required: true },
    reportDescription: { type: String },
    reportImage: { type: String },
    reporterEmail: { type: String, required: true },
    reportLocation: { type: String },
    reportType: { type: String },
    informPerson: { type: String },
    informLocalPolice: { type: String },
    reporterContact: { type: String },
    reporterAddress: { type: String },
    isBlocked: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    status: { type: String },
  },
  {
    timestamps: true,
  },
)
const Report = model<IReport>('Report', ReportSchema)
