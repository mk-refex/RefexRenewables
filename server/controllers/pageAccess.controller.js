import { z } from "zod";
import { User } from "../models/index.js";

const trackPageAccessSchema = z.object({
  pageId: z.string().min(1, "Page ID is required"),
  pageName: z.string().min(1, "Page name is required"),
});

export async function trackPageAccess(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parse = trackPageAccessSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const { pageId, pageName } = parse.data;

    // Don't track overview or user-management pages
    if (pageId === "overview" || pageId === "user-management") {
      return res.json({ message: "Page access tracked (skipped)" });
    }

    // Get user and update recentPages array
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recentPages = Array.isArray(user.recentPages) ? [...user.recentPages] : [];
    
    // Remove if page already exists
    const filteredPages = recentPages.filter((p) => p.pageId !== pageId);
    
    // Add new page access to the beginning
    filteredPages.unshift({
      pageId,
      pageName,
      accessedAt: new Date().toISOString(),
    });
    
    // Keep only last 10 pages
    const updatedPages = filteredPages.slice(0, 10);
    
    // Update user
    await user.update({ recentPages: updatedPages });

    return res.json({ message: "Page access tracked successfully" });
  } catch (error) {
    console.error("Track page access error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getRecentPages(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get user's recent pages
    const user = await User.findByPk(userId, {
      attributes: ["recentPages"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recentPages = Array.isArray(user.recentPages) ? user.recentPages : [];
    
    // Return last 5 pages
    return res.json(
      recentPages.slice(0, 5).map((page) => ({
        id: page.pageId,
        name: page.pageName,
        accessedAt: page.accessedAt,
      }))
    );
  } catch (error) {
    console.error("Get recent pages error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

