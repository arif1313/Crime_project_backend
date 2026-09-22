import Joi from "joi";

export const createLocalUserValidation = Joi.object({
  
  userId: Joi.string().hex().length(24).optional(),
  firstName: Joi.string().min(1).max(50).optional(),
  middleName: Joi.string().min(1).max(50).optional(),
  lastName: Joi.string().min(1).max(50).optional(),
  profileImage: Joi.string().optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  age: Joi.number().integer().min(0).max(120).optional(),
  dateOfBirth: Joi.date().optional(),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  emergencyContact: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  address: Joi.string().max(255).optional(),
  currentLocation: Joi.string().max(255).optional(),
  connectedMembers: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().max(100).optional(),
  isBlocked: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  email: Joi.string().email().required(),   
  password: Joi.string().min(6).max(30).required(), 
});

export const updateLocalUserValidation = Joi.object({
  firstName: Joi.string().min(1).max(50),
  middleName: Joi.string().max(50).allow(null, ""),
  lastName: Joi.string().min(1).max(50),
  profileImage: Joi.string(), 
  gender: Joi.string().valid("male", "female", "other"),
  age: Joi.number().min(0),
  dateOfBirth: Joi.date(),
  contactNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  emergencyContact: Joi.string().pattern(/^[0-9]{10,15}$/),
  address: Joi.string().max(255),
  currentLocation: Joi.string().max(255),
  connectedMembers: Joi.array().items(Joi.string()),
  status: Joi.string().max(50),
  isBlocked: Joi.boolean(),
  isDeleted: Joi.boolean(),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(30),
});
