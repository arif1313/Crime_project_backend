import mongoose, { model, Schema } from 'mongoose'
import { ILocalUser } from './LocalUserInterface'

const LocalUserSchema = new Schema<ILocalUser>(
  {
    userId: { type: String, required: true },
    role: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    profileImage: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'] },
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
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  },
)
const LocalUser = model<ILocalUser>('LocalUser', LocalUserSchema)
