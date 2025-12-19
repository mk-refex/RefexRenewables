import { z } from "zod";
import { PageContent } from "../models/index.js";

// Schema for page content
const pageContentSchema = z.object({
  pageId: z.string().min(1, "Page ID is required"),
  pageName: z.string().min(1, "Page name is required"),
  sectionId: z.string().min(1, "Section ID is required"),
  content: z.any(), // Allow any JSON structure
});

// Get content for a specific page and section
export async function getPageContent(req, res) {
  try {
    const { pageId, sectionId } = req.query;

    if (!pageId) {
      return res.status(400).json({ message: "Page ID is required" });
    }

    const where = { pageId };
    if (sectionId) {
      where.sectionId = sectionId;
    }

    const contents = await PageContent.findAll({
      where,
      order: [["sectionId", "ASC"]],
    });

    return res.json(contents);
  } catch (error) {
    console.error("Get page content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Create or update page content
export async function upsertPageContent(req, res) {
  try {
    const parse = pageContentSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const { pageId, pageName, sectionId, content } = parse.data;

    // Check if user has access to this page
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Admins have all access
    const isAdmin = user.role === "admin" || user.permissions === null;
    
    // Check if user has permission for this page
    const hasAccess =
      isAdmin ||
      (user.permissions &&
        Array.isArray(user.permissions) &&
        user.permissions.includes(pageId));

    if (!hasAccess) {
      return res.status(403).json({
        message: `Forbidden: Access to ${pageId} page required`,
        userRole: user.role,
        userPermissions: user.permissions,
        requiredPage: pageId,
      });
    }

    // Find existing content or create new
    const [pageContent, created] = await PageContent.findOrCreate({
      where: { pageId, sectionId },
      defaults: {
        pageId,
        pageName,
        sectionId,
        content,
      },
    });

    if (!created) {
      // Update existing
      await pageContent.update({
        pageName,
        content,
      });
    }

    return res.json({
      id: pageContent.id,
      pageId: pageContent.pageId,
      pageName: pageContent.pageName,
      sectionId: pageContent.sectionId,
      content: pageContent.content,
      createdAt: pageContent.createdAt,
      updatedAt: pageContent.updatedAt,
    });
  } catch (error) {
    console.error("Upsert page content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Delete page content
export async function deletePageContent(req, res) {
  try {
    const { pageId, sectionId } = req.query;

    if (!pageId || !sectionId) {
      return res.status(400).json({
        message: "Page ID and Section ID are required",
      });
    }

    // Check if user has access to this page
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Admins have all access
    const isAdmin = user.role === "admin" || user.permissions === null;

    // Check if user has permission for this page
    const hasAccess =
      isAdmin ||
      (user.permissions &&
        Array.isArray(user.permissions) &&
        user.permissions.includes(pageId));

    if (!hasAccess) {
      return res.status(403).json({
        message: `Forbidden: Access to ${pageId} page required`,
      });
    }

    const content = await PageContent.findOne({
      where: { pageId, sectionId },
    });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    await content.destroy();
    return res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete page content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

