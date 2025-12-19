import { Router } from "express";
import usersRouter from "./users.routes.js";
import authRouter from "./auth.routes.js";
import pageAccessRouter from "./pageAccess.routes.js";
import investorContentRouter from "./investorContent.routes.js";
import investorHeroRouter from "./investorHero.routes.js";
import pageContentRouter from "./pageContent.routes.js";
import { getOverview } from "../controllers/overview.controller.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/page-access", pageAccessRouter);
router.use("/investor-content", investorContentRouter);
router.use("/investor-hero", investorHeroRouter);
router.use("/page-content", pageContentRouter);
router.get("/overview", authRequired, getOverview);

export default router;
