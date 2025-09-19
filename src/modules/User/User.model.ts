import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./UserInterface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["localUser", "localPolice", "centerPolice","actionTeam"], 
      required: true 
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

// 🔐 hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const UserModel = model<IUser>("User", UserSchema);
