import Joi from "joi";
import { Types } from "mongoose";

// ✅ Create Schema
export const createActionTeamSchema = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  firstName: Joi.string().required(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required(),
  profileImage: Joi.string().uri().optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  age: Joi.number().min(0).optional(),
  dateOfBirth: Joi.date().optional(),
  contactNumber: Joi.string().optional(),
  emergencyContact: Joi.string().optional(),
  address: Joi.string().optional(),
  status: Joi.string().optional(),
  activity: Joi.string().valid("work", "free", "vacation").optional(),
  joingDate: Joi.date().required(),
  isBlocked: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

// ✅ Update Schema
export const updateActionTeamSchema = Joi.object({
  firstName: Joi.string().optional(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  profileImage: Joi.string().uri().optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  age: Joi.number().min(0).optional(),
  dateOfBirth: Joi.date().optional(),
  contactNumber: Joi.string().optional(),
  emergencyContact: Joi.string().optional(),
  address: Joi.string().optional(),
  status: Joi.string().optional(),
  activity: Joi.string().valid("work", "free", "vacation").optional(),
  joingDate: Joi.date().optional(), 
  isBlocked: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
}).min(1); 
