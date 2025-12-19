import { Router } from "express";
import { authRequired, requireInvestorAccess } from "../middleware/auth.js";
import {
  getAllInvestorContent,
  getInvestorContentByCategory,
  upsertInvestorContent,
  deleteInvestorContent,
  getLegacyTimeline,
  uploadPDFFile,
  uploadPDF,
} from "../controllers/investorContent.controller.js";

const router = Router();

// Public routes (for website)
router.get("/", getAllInvestorContent);
router.get("/category/:categoryId", getInvestorContentByCategory);
router.get("/legacy-timeline", getLegacyTimeline);

// Protected routes - users with investor-relations permission can access
router.post("/", authRequired, requireInvestorAccess, upsertInvestorContent);
router.post("/upload-pdf", authRequired, requireInvestorAccess, uploadPDF.single("pdf"), uploadPDFFile);
router.put("/:categoryId", authRequired, requireInvestorAccess, upsertInvestorContent);
router.delete("/:categoryId", authRequired, requireInvestorAccess, deleteInvestorContent);


export default router;

