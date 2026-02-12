import { Reservation, Room, User } from "../models/index.js";
import { Op } from "sequelize";

export const checkRoomAvailability = async (roomId, start, end, excludeId=null) => {

  const where = {
    room_id: roomId,
    status: { [Op.notIn]: ["cancelada","completada"] },
    [Op.or]: [
      { start_date: { [Op.between]: [start, end] } },
      { end_date: { [Op.between]: [start, end] } },
      {
        start_date: { [Op.lte]: start },
        end_date: { [Op.gte]: end }
      }
    ]
  };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  const conflict = await Reservation.findOne({ where });

  return !conflict;
};

export const createReservationService = async (data) => {
  return await Reservation.create(data);
};

export const getAllReservationsService = async () => {
  return await Reservation.findAll({
    include: [User, Room]
  });
};

export const getReservationsByUserService = async (userId) => {
  return await Reservation.findAll({
    where: { user_id: userId },
    include: Room
  });
};

export const getReservationByIdService = async (id) => {
  return await Reservation.findByPk(id, {
    include: [User, Room]
  });
};

export const updateReservationService = async (id, data) => {
  await Reservation.update(data, { where: { id } });
  return await Reservation.findByPk(id);
};

export const deleteReservationService = async (id) => {
  return await Reservation.destroy({ where: { id } });
};