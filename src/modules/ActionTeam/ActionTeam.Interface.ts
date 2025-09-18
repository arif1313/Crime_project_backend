import { Schema, model, Types } from "mongoose";

export type IActionteam = {
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
  status?: string;
  activity?:"work"|"free"|"vacation";
  joingDate:Date;
  isBlocked: boolean;
  isDeleted: boolean;
};