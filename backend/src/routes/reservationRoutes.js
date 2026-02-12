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

router.post("/",
  verifyToken,
  validate(createReservationSchema),
  createReservation
);

router.get("/",
  verifyToken,
  authorizeRoles("ADMIN","TRABAJADOR"),
  getAllReservations
);

router.get("/my",
  verifyToken,
  getMyReservations
);

router.get("/:id",
  verifyToken,
  getReservationById
);

router.put("/:id",
  verifyToken,
  validate(updateReservationSchema),
  updateReservation
);

router.delete("/:id",
  verifyToken,
  deleteReservation
);

export default router;