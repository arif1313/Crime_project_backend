import { Types } from "mongoose";

export type ILocalPoliceStation = {
  id: string;
  userId: Types.ObjectId;   // ✅ Proper reference to User
  stationName: string;
  logo?: string;
  contactNumber?: string;
  emergencyContact1?: string;
  emergencyContact2?: string;
  stationAddress?: string;
  status?: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};
