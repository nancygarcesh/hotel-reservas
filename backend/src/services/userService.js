import { User, Role } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

export const createUserService = async (data) => {
  const user = await User.create({
    uuid: uuidv4(),
    ...data
  });

  return user;
};

export const getAllUsersService = async () => {
  return await User.findAll({ include: Role });
};

export const getUserByIdService = async (id) => {
  return await User.findByPk(id, { include: Role });
};

export const updateUserService = async (id, data) => {
  await User.update(data, { where: { id } });
  return await User.findByPk(id);
};

export const deleteUserService = async (id) => {
  return await User.destroy({ where: { id } });
};