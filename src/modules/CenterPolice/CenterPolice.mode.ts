import mongoose, { Schema } from 'mongoose'
import { ICenterPolice } from './CenterPoliceInterface'

const CenterPoliceSchema = new Schema<ICenterPolice>(
  {
    userId: { type: String, required: true },
    centerStationName: { type: String, required: true },
    logo: { type: String },
    contactNumber: { type: String },
    emergencyContact1: { type: String },
    emergencyContact2: { type: String },
    centerStationAddress: { type: String },
    status: { type: String },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)
const CenterPolice = mode<ICenterPolice>('CenterPolice', CenterPoliceSchema)
