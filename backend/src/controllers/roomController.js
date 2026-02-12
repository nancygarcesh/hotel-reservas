import {
  createRoomService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomService,
  deleteRoomService
} from "../services/roomService.js";

export const createRoom = async (req, res, next) => {
  try {

    const images = req.files?.map(f => f.path).join(",") || null;

    const room = await createRoomService({
      ...req.body,
      images
    });

    res.status(201).json(room);

  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {

    const rooms = await getAllRoomsService(req.query);
    res.json(rooms);

  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req, res, next) => {
  try {

    const room = await getRoomByIdService(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Habitación no existe" });
    }

    res.json(room);

  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {

    if (req.files?.length > 0) {
      req.body.images = req.files.map(f => f.path).join(",");
    }

    const room = await updateRoomService(req.params.id, req.body);

    res.json(room);

  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {

    await deleteRoomService(req.params.id);

    res.json({ message: "Habitación eliminada" });

  } catch (error) {
    next(error);
  }
};