import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  getPageContent,
  upsertPageContent,
  deletePageContent,
} from "../controllers/pageContent.controller.js";

const router = Router();

// Public route - get content (for website)
router.get("/", getPageContent);

// Protected routes - users with page access can edit
router.post("/", authRequired, upsertPageContent);
router.put("/", authRequired, upsertPageContent);
router.delete("/", authRequired, deletePageContent);

export default router;

