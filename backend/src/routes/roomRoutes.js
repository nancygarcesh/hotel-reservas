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

router.get("/", getAllRooms);
router.get("/:id", getRoomById);

router.post("/",
  verifyToken,
  authorizeRoles("ADMIN","TRABAJADOR"),
  upload.array("images", 5),
  validate(createRoomSchema),
  createRoom
);

router.put("/:id",
  verifyToken,
  authorizeRoles("ADMIN","TRABAJADOR"),
  upload.array("images", 5),
  validate(updateRoomSchema),
  updateRoom
);

router.delete("/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  deleteRoom
);

export default router;