import {
  createReservationService,
  getAllReservationsService,
  getReservationsByUserService,
  getReservationByIdService,
  updateReservationService,
  deleteReservationService,
  checkRoomAvailability
} from "../services/reservationService.js";

import { Room, User } from "../models/index.js";

export const createReservation = async (req, res, next) => {
  try {

    const { room_id, start_date, end_date } = req.body;

    const room = await Room.findByPk(room_id);
    if (!room) return res.status(404).json({ message: "Habitación no existe" });

    if (new Date(start_date) < new Date().setHours(0,0,0,0)) {
      return res.status(400).json({ message: "Fecha inválida" });
    }

    const available = await checkRoomAvailability(room_id, start_date, end_date);

    if (!available) {
      return res.status(400).json({ message: "Habitación no disponible" });
    }

    const reservation = await createReservationService({
      user_id: req.user.id,
      room_id,
      start_date,
      end_date
    });

    await room.update({ status: "reservada" });

    res.status(201).json(reservation);

  } catch (error) {
    next(error);
  }
};

export const getAllReservations = async (req, res, next) => {
  try {
    const data = await getAllReservationsService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMyReservations = async (req, res, next) => {
  try {
    const data = await getReservationsByUserService(req.user.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getReservationById = async (req, res, next) => {
  try {

    const reservation = await getReservationByIdService(req.params.id);

    if (!reservation) return res.status(404).json({ message: "No existe" });

    if (
      req.user.role === "CLIENTE" &&
      reservation.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.json(reservation);

  } catch (error) {
    next(error);
  }
};

export const updateReservation = async (req, res, next) => {
  try {

    const reservation = await getReservationByIdService(req.params.id);
    if (!reservation) return res.status(404).json({ message: "No existe" });

    if (
      req.user.role === "CLIENTE" &&
      reservation.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    if (req.body.start_date || req.body.end_date) {

      const start = req.body.start_date || reservation.start_date;
      const end = req.body.end_date || reservation.end_date;

      const available = await checkRoomAvailability(
        reservation.room_id,
        start,
        end,
        reservation.id
      );

      if (!available) {
        return res.status(400).json({ message: "Conflicto fechas" });
      }
    }

    const updated = await updateReservationService(req.params.id, req.body);

    res.json(updated);

  } catch (error) {
    next(error);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {

    const reservation = await getReservationByIdService(req.params.id);
    if (!reservation) return res.status(404).json({ message: "No existe" });

    if (
      req.user.role === "CLIENTE" &&
      reservation.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await deleteReservationService(req.params.id);

    res.json({ message: "Reserva eliminada" });

  } catch (error) {
    next(error);
  }
};