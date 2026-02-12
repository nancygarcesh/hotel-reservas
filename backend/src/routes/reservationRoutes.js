import { Router } from "express";
import {
  createReservation,
  getAllReservations,
  getMyReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} from "../controllers/reservationController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createReservationSchema, updateReservationSchema } from "../validators/reservationValidator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestión reservas
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Crear reserva
 *     tags: [Reservations]
 */
router.post("/",
  verifyToken,
  validate(createReservationSchema),
  createReservation
);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Ver todas reservas
 *     tags: [Reservations]
 */
router.get("/",
  verifyToken,
  authorizeRoles("ADMIN","TRABAJADOR"),
  getAllReservations
);

/**
 * @swagger
 * /reservations/my:
 *   get:
 *     summary: Ver reservas propias
 *     tags: [Reservations]
 */
router.get("/my",
  verifyToken,
  getMyReservations
);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Obtener reserva por ID
 *     tags: [Reservations]
 */
router.get("/:id",
  verifyToken,
  getReservationById
);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Actualizar reserva
 *     tags: [Reservations]
 */
router.put("/:id",
  verifyToken,
  validate(updateReservationSchema),
  updateReservation
);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Eliminar reserva
 *     tags: [Reservations]
 */
router.delete("/:id",
  verifyToken,
  deleteReservation
);

export default router;