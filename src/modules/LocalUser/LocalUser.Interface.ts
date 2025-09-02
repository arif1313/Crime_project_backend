import { Schema, model, Types } from "mongoose";

export type ILocalUser = {
  userId: Types.ObjectId;   // ✅ Reference to User
  firstName: string;
  middleName?: string;
  lastName: string;
  profileImage?: string;
  gender?: "male" | "female" | "other";
  age?: number;
  dateOfBirth?: Date;
  contactNumber?: string;
  emergencyContact?: string;
  address?: string;
  currentLocation?: string;
  connectedMembers?: string[];
  status?: string;
  isBlocked: boolean;
  isDeleted: boolean;
};