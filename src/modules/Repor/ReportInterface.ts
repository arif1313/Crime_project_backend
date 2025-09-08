import { Types } from "mongoose";

export type IReport = {
  _id?: string;

  reportId: string; // auto-generated, always exists
  reportDate?: Date;
  reportTime?: Date;

  reportTitle: string;
  reportDescription?: string;
  reportImage?: string; // single image

  reporterId: Types.ObjectId;

  reportLocation?: string;
  reportType?: "murder" | "robbery" | "fraud" | "assault" | "theft" | "arson" | "other";

  informPerson?: boolean;
  informLocalPolice?: boolean;

  crimeDate?: Date;
  crimeTime?: string;

  isBlocked?: boolean;
  isDeleted?: boolean;
  status?: "pending" | "reviewed" | "resolved" | "closed";

  createdAt?: Date;
  updatedAt?: Date;
};
