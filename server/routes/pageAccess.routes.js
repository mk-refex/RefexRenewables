import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { trackPageAccess, getRecentPages } from "../controllers/pageAccess.controller.js";

const router = Router();

router.post("/track", authRequired, trackPageAccess);
router.get("/recent", authRequired, getRecentPages);

export default router;

