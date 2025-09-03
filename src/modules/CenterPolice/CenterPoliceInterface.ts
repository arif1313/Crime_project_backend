// src/modules/CenterPolice/CenterPoliceInterface.ts
import { Types } from "mongoose";

export type ICenterPolice = {
  id?: string;
  userId: Types.ObjectId;   // ✅ Reference to User
  centerStationName: string;
  logo?: string;
  contactNumber?: string;
  emergencyContact1?: string;
  emergencyContact2?: string;
  centerStationAddress?: string;
  status?: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};
