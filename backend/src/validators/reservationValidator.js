import Joi from "joi";

export const createReservationSchema = Joi.object({
  room_id: Joi.number().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().greater(Joi.ref("start_date")).required()
});

export const updateReservationSchema = Joi.object({
  start_date: Joi.date(),
  end_date: Joi.date(),
  status: Joi.string().valid("pendiente","confirmada","cancelada","completada")
});