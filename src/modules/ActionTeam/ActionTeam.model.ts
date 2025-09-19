import { Schema, model, Types } from "mongoose";
import { IActionteam } from "./ActionTeam.Interface";


const actionTeamSchema = new Schema<IActionteam>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    profileImage: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    age: { type: Number },
    dateOfBirth: { type: Date },
    contactNumber: { type: String },
    emergencyContact: { type: String },
    address: { type: String },
    status: { type: String },
    activity: { type: String, enum: ["work", "free", "vacation"], default: "free" },
    joingDate: { 
  type: Date, 
  required: true, 
  default: Date.now // 👈 auto set
},
   
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ActionTeamModel = model<IActionteam>("ActionTeam", actionTeamSchema);
