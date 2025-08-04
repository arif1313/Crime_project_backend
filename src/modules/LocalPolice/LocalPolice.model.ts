import mongoose, { model, Schema } from 'mongoose'
import { ILocalPoliceStation } from './LocalPoliceInterface'
const LocalPoliceCenterSchema = new Schema<ILocalPoliceStation>(
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
export const LocalPoliceStationModel = model<ILocalPoliceStation>(
  'LocalPoliceStation',
  LocalPoliceCenterSchema,
)
