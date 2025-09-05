import Joi from "joi";
import { Types } from "mongoose";

export const createReportValidation = Joi.object({
  reportId: Joi.string().required(),
  reportTime: Joi.date().default(() => new Date()),
  reportTitle: Joi.string().min(3).max(200).required(),
  reportDescription: Joi.string().allow("", null),
  reportImage: Joi.string().uri().allow("", null),

  reporterId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "any.invalid": "Invalid reporterId, must be a valid MongoDB ObjectId",
    }),

  reportLocation: Joi.string().allow("", null),
  reportType: Joi.string()
    .valid("crime", "missing", "accident", "other")
    .default("other"),
  informPerson: Joi.string().allow("", null),
  informLocalPolice: Joi.string().allow("", null),

  isBlocked: Joi.boolean().default(false),
  isDeleted: Joi.boolean().default(false),

  status: Joi.string()
    .valid("pending", "reviewed", "resolved", "closed")
    .default("pending"),
});
export const updateReportValidation = Joi.object({
  reportTitle: Joi.string().min(3).max(200),
  reportDescription: Joi.string().allow("", null),
  reportImage: Joi.string().uri().allow("", null),

  reporterId: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }).messages({
    "any.invalid": "Invalid reporterId, must be a valid MongoDB ObjectId",
  }),

  reportLocation: Joi.string(),
  reportType: Joi.string().valid("crime", "missing", "accident", "other"),
  informPerson: Joi.string(),
  informLocalPolice: Joi.string(),

  isBlocked: Joi.boolean(),
  isDeleted: Joi.boolean(),

  status: Joi.string().valid("pending", "reviewed", "resolved", "closed"),
}).min(1);
