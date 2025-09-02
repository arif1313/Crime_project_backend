import { Types } from "mongoose";

export type ICenterPolice = {
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
};