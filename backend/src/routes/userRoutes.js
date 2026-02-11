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

router.get("/", verifyToken, authorizeRoles("ADMIN"), getAllUsers);

router.get("/me", verifyToken, getMyProfile);

router.get("/:id", verifyToken, authorizeRoles("ADMIN"), getUserById);

router.put("/:id",
  verifyToken,
  validate(updateUserSchema),
  updateUser
);

router.delete("/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  deleteUser
);

export default router;