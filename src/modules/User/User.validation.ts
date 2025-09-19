import Joi from "joi";

export const createUserValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  password: Joi.string().min(6).max(30).required(),
  role: Joi.string().valid("localUser", "localPolice", "centerPolice","actionTeam").required(),
  isBlocked: Joi.boolean().default(false),
  isDeleted: Joi.boolean().default(false),
});
