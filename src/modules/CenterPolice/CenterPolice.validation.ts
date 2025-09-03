// src/modules/CenterPolice/centerPolice.validation.ts
import Joi from "joi";

export const createCenterPoliceValidation = Joi.object({
  userId: Joi.string().hex().length(24).optional(),
  centerStationName: Joi.string().min(2).max(100).required(),
  logo: Joi.string().uri().optional(),
  contactNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
  emergencyContact1: Joi.string().pattern(/^\+?[0-9]{10,15}$/).optional(),
  emergencyContact2: Joi.string().pattern(/^\+?[0-9]{10,15}$/).optional(),
  centerStationAddress: Joi.string().max(255).required(),
  status: Joi.string().max(100).optional(),
  isBlocked: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  email: Joi.string().email().required(),   // ✅ User reference
});

// ✅ Partial validation for updates
export const updateCenterPoliceValidation = Joi.object({
  centerStationName: Joi.string().min(2).max(100),
  logo: Joi.string().uri(),
  contactNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
  emergencyContact1: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
  emergencyContact2: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
  centerStationAddress: Joi.string().max(255),
  status: Joi.string().max(100),
  isBlocked: Joi.boolean(),
  isDeleted: Joi.boolean(),
  email: Joi.string().email(),
});
