import {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from "../services/userService.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);

    if (!user) return res.status(404).json({ message: "No existe" });

    res.json(user);

  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {

    const targetId = req.params.id;

    if (req.user.role === "CLIENTE" && req.user.id != targetId) {
      return res.status(403).json({ message: "Solo puedes editar tu perfil" });
    }

    const user = await updateUserService(targetId, req.body);

    res.json(user);

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {

    await deleteUserService(req.params.id);

    res.json({ message: "Usuario eliminado" });

  } catch (error) {
    next(error);
  }
};