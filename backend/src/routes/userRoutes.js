import { Router } from "express";
import {
  getAllUsers,
  getMyProfile,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { updateUserSchema } from "../validators/userValidator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", verifyToken, authorizeRoles("ADMIN"), getAllUsers);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtener perfil propio
 *     tags: [Users]
 */
router.get("/me", verifyToken, getMyProfile);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 */
router.get("/:id", verifyToken, authorizeRoles("ADMIN"), getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 */
router.put("/:id",
  verifyToken,
  validate(updateUserSchema),
  updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 */
router.delete("/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  deleteUser
);

export default router;