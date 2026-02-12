import { Router } from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} from "../controllers/roomController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createRoomSchema, updateRoomSchema } from "../validators/roomValidator.js";
import { upload } from "../config/multerConfig.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Gestión habitaciones
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Obtener habitaciones
 *     tags: [Rooms]
 */
router.get("/", getAllRooms);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Obtener habitación por ID
 *     tags: [Rooms]
 */
router.get("/:id", getRoomById);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Crear habitación
 *     tags: [Rooms]
 */
router.post("/",
  verifyToken,
  authorizeRoles("ADMIN","TRABAJADOR"),
  upload.array("images", 5),
  validate(createRoomSchema),
  createRoom
);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Actualizar habitación
 *     tags: [Rooms]
 */
router.put("/:id",
  verifyToken,
  authorizeRoles("ADMIN","TRABAJADOR"),
  upload.array("images", 5),
  validate(updateRoomSchema),
  updateRoom
);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Eliminar habitación
 *     tags: [Rooms]
 */
router.delete("/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  deleteRoom
);

export default router;