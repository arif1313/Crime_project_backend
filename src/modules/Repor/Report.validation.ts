import Joi from "joi";

// Allowed values
const allowedReportTypes = ["murder", "robbery", "fraud", "assault", "theft", "arson", "other"] as const;
const allowedStatus = ["pending", "reviewed", "resolved", "closed"] as const;

// Create report validation
export const createReportValidation = Joi.object({
  reportTitle: Joi.string().required(),
  reportType: Joi.string().valid(...allowedReportTypes).required(),
  status: Joi.string().valid(...allowedStatus).optional(),
  reportDescription: Joi.string().required(),
  reportLocation: Joi.string().required(),
  reporterId: Joi.string().required(),
  reportImage: Joi.string().required(), // single image
  informPerson: Joi.boolean().optional(),
  informLocalPolice: Joi.boolean().optional(),
  crimeDate: Joi.date().optional(),
  crimeTime: Joi.string().optional(),
  isBlocked: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

// Update report validation
export const updateReportValidation = Joi.object({
  reportTitle: Joi.string().optional(),
  reportType: Joi.string().valid(...allowedReportTypes).optional(),
  status: Joi.string().valid(...allowedStatus).optional(),
  reportDescription: Joi.string().optional(),
  reportLocation: Joi.string().optional(),
  reporterId: Joi.string().optional(),
   reportImage: Joi.string().optional(),
    informPerson: Joi.boolean().optional(),       // ✅ add this
  informLocalPolice: Joi.boolean().optional(),  // ✅ add this
  crimeDate: Joi.date().optional(),
  crimeTime: Joi.string().optional(),
  isBlocked: Joi.boolean().optional(),    // ✅ add this
  isDeleted: Joi.boolean().optional(),    // ✅ add this
  
});

