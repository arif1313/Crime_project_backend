import { model, Schema } from "mongoose";
import { ILocalPoliceStation } from "./LocalPoliceInterface";

const LocalPoliceCenterSchema = new Schema<ILocalPoliceStation>(
  {
    userId: { 
      type: Schema.Types.ObjectId,    // ✅ Proper ObjectId reference
      ref: "User",                    // ✅ Connect to User model
      required: true 
    },
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
    timestamps: true,
  }
);

export const LocalPoliceStationModel = model<ILocalPoliceStation>(
  "LocalPoliceStation",
  LocalPoliceCenterSchema
);
