import { Router } from "express";
import { authRequired, requireAdmin } from "../middleware/auth.js";
import {
  listUsers,
  me,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/me", authRequired, me);
router.get("/", authRequired, requireAdmin, listUsers);
router.post("/", authRequired, requireAdmin, createUser);
router.patch("/:id", authRequired, requireAdmin, updateUser);
router.delete("/:id", authRequired, requireAdmin, deleteUser);

export default router;
