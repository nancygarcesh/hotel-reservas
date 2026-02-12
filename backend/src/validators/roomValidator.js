import Joi from "joi";

export const createRoomSchema = Joi.object({
  room_number: Joi.string().required(),
  type: Joi.string().required(),
  capacity: Joi.number().min(1).required(),
  price_per_night: Joi.number().min(0).required(),
  description: Joi.string().allow("", null),
  amenities: Joi.string().allow("", null)
});

export const updateRoomSchema = Joi.object({
  room_number: Joi.string(),
  type: Joi.string(),
  capacity: Joi.number().min(1),
  price_per_night: Joi.number().min(0),
  description: Joi.string().allow("", null),
  amenities: Joi.string().allow("", null),
  status: Joi.string().valid("libre","ocupada","mantenimiento","reservada")
});