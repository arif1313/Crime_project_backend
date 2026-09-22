
import { Schema, model, Types } from "mongoose";
import { ILocalUser } from "./LocalUser.Interface";

const LocalUserSchema = new Schema<ILocalUser>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   
    firstName: { type: String, default: "" },
    middleName: { type: String },
    lastName: { type: String, default: "" },
    profileImage: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    age: { type: Number },
    dateOfBirth: { type: Date },
    contactNumber: { type: String },
    emergencyContact: { type: String },
    address: { type: String },
    currentLocation: { type: String },
    connectedMembers: [{ type: String }],
    status: { type: String },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const LocalUserModel = model<ILocalUser>("LocalUser", LocalUserSchema);