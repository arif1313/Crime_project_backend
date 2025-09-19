import Joi from "joi";
import mongoose from "mongoose";

// Allowed values
const allowedReportTypes = ["murder", "robbery", "fraud", "assault", "theft", "arson", "other"] as const;
const allowedStatus = ["pending", "reviewed", "resolved", "closed"] as const;

// Common field validation
const objectIdValidation = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId validation");

// ✅ Create report validation
export const createReportValidation = Joi.object({
  reportTitle: Joi.string().required(),
  reportType: Joi.string().valid(...allowedReportTypes).required(),
  status: Joi.string().valid(...allowedStatus).optional(),
  reportDescription: Joi.string().required(),
  reportLocation: Joi.string().required(),
  reporterId: objectIdValidation.required(),
  reportImage: Joi.string().required(), // single image
  informPerson: Joi.boolean().optional(),
  informLocalPolice: Joi.boolean().optional(),
  crimeDate: Joi.date().optional(),
  crimeTime: Joi.string().optional(),
  isBlocked: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  varifyNumber: Joi.number().default(0),

  verifiedBy: Joi.array().items(objectIdValidation),
  ActionTaken: Joi.array().items(objectIdValidation).optional(),
});

// ✅ Update report validation
export const updateReportValidation = Joi.object({
  reportTitle: Joi.string().optional(),
  reportType: Joi.string().valid(...allowedReportTypes).optional(),
  status: Joi.string().valid(...allowedStatus).optional(),
  reportDescription: Joi.string().optional(),
  reportLocation: Joi.string().optional(),
  reporterId: objectIdValidation.optional(),
  reportImage: Joi.string().optional(),
  informPerson: Joi.boolean().optional(),
  informLocalPolice: Joi.boolean().optional(),
  crimeDate: Joi.date().optional(),
  crimeTime: Joi.string().optional(),
  isBlocked: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  varifyNumber: Joi.number().optional(),
ActionTaken: Joi.array().items(objectIdValidation).optional(),
  verifiedBy: Joi.array().items(objectIdValidation).optional(),
});
