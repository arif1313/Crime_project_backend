import { Schema, model } from "mongoose";
import { ICenterPolice } from "./CenterPoliceInterface";
const CenterPoliceSchema = new Schema<ICenterPolice>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  { timestamps: true }
);

export const CenterPoliceModel = model<ICenterPolice>("CenterPolice", CenterPoliceSchema);