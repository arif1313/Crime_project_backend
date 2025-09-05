import { Types } from "mongoose";

export type IReport = {
  _id?: string;
  reportId: string;
  reportTime: Date;
  reportTitle: string;
  reportDescription?: string;
  reportImage?: string;

  reporterId: Types.ObjectId; // ✅ Reference to User model

  reportLocation?: string;
  reportType?: "crime" | "missing" | "accident" | "other";
  informPerson?: string;
  informLocalPolice?: string;

  isBlocked: boolean;
  isDeleted: boolean;
  status?: "pending" | "reviewed" | "resolved" | "closed";

  createdAt?: Date;
  updatedAt?: Date;
};
