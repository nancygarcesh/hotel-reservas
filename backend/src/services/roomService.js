import { Room } from "../models/index.js";

export const createRoomService = async (data) => {
  return await Room.create(data);
};

export const getAllRoomsService = async (filters) => {

  const where = {};

  if (filters.status) where.status = filters.status;
  if (filters.type) where.type = filters.type;

  return await Room.findAll({ where });
};

export const getRoomByIdService = async (id) => {
  return await Room.findByPk(id);
};

export const updateRoomService = async (id, data) => {
  await Room.update(data, { where: { id } });
  return await Room.findByPk(id);
};

export const deleteRoomService = async (id) => {
  return await Room.destroy({ where: { id } });
};