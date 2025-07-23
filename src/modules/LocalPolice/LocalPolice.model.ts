import { Schema } from 'mongoose'
import { ILocalPoliceCenter } from './LocalPoliceInterface'

const LocalPoliceCenterSchema = new Schema<ILocalPoliceCenter>(
  {
    userId: { type: String, required: true },
    stationName: { type: String, required: true },
    logo: { type: String },
    contactNumber: { type: String },
    emergencyContact1: { type: String },
    emergencyContact2: { type: String },
    stationAddress: { type: String },
    status: { type: String },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
)

export default mongoose.model<ILocalPoliceCenter>(
  'LocalPoliceCenter',
  LocalPoliceCenterSchema,
)
