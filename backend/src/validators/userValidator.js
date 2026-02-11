import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(150).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().allow(null, "")
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(150),
  phone: Joi.string().allow(null, ""),
  role_id: Joi.number()
});