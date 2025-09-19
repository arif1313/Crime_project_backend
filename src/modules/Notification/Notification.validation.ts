import Joi from "joi";

export const createNotificationSchema = Joi.object({
  ReportId: Joi.string().required(),
  message: Joi.string().required(),
  isRead: Joi.boolean().optional(),
});

export const updateNotificationSchema = Joi.object({
  isRead: Joi.boolean().required(),
});
