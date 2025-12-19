import { z } from "zod";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { InvestorHero } from "../models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads/images directory exists
const uploadsImagesPath = path.join(__dirname, "../uploads/images");
if (!fs.existsSync(uploadsImagesPath)) {
  fs.mkdirSync(uploadsImagesPath, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/images");
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, gif, webp) are allowed!"), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// Schema for title item
const titleItemSchema = z.object({
  text: z.string().min(1),
  size: z.enum(["small", "normal"]),
  order: z.number().int().min(0),
});

// Schema for investor hero
const investorHeroSchema = z.object({
  titleItems: z.array(titleItemSchema).min(1, "At least one title item is required"),
  imageUrl: z.string().optional(),
});

// Get investor hero (public)
export async function getInvestorHero(_req, res) {
  try {
    // Get the first (and only) hero entry, or create default if none exists
    let hero = await InvestorHero.findOne();

    if (!hero) {
      // Create default hero entry with titleItems
      hero = await InvestorHero.create({
        imageUrl: "",
        titleItems: [
          { text: "Investor", size: "small", order: 0 },
          { text: "& Relations", size: "normal", order: 1 }
        ],
      });
    }

    // Ensure titleItems exists and is sorted by order
    let titleItems = hero.titleItems || [];
    if (Array.isArray(titleItems)) {
      titleItems = titleItems.sort((a, b) => (a.order || 0) - (b.order || 0));
    } else {
      titleItems = [];
    }
    
    // If titleItems is empty, create default
    if (titleItems.length === 0) {
      titleItems = [
        { text: "Investor", size: "small", order: 0 },
        { text: "& Relations", size: "normal", order: 1 }
      ];
      // Save default to database
      hero.titleItems = titleItems;
      await hero.save();
    }

    // Return relative URL path: /images/filename.jpg
    // Images stored as "images/filename.jpg" in DB, convert to "/images/filename.jpg"
    let imageUrl = hero.imageUrl;
    if (imageUrl) {
      if (imageUrl.startsWith('http')) {
        // Keep external URLs as is
        imageUrl = imageUrl;
      } else if (imageUrl.startsWith('uploads/images/')) {
        // Convert old format to new format
        imageUrl = `/${imageUrl.replace('uploads/images/', 'images/')}`;
      } else if (imageUrl.startsWith('/')) {
        // Already has leading slash
        imageUrl = imageUrl;
      } else {
        // Add leading slash for relative path
        imageUrl = `/${imageUrl}`;
      }
    } else {
      imageUrl = null;
    }

    return res.json({
      id: hero.id,
      imageUrl: imageUrl,
      titleItems: titleItems,
      createdAt: hero.createdAt,
      updatedAt: hero.updatedAt,
    });
  } catch (error) {
    console.error("Get investor hero error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Create or update investor hero
export async function upsertInvestorHero(req, res) {
  try {
    // Handle both FormData (file upload) and JSON (URL update) requests
    // Parse titleItems from JSON string if it's in FormData, or use directly if JSON
    let titleItems = req.body.titleItems;
    if (typeof titleItems === 'string') {
      try {
        titleItems = JSON.parse(titleItems);
      } catch (e) {
        titleItems = undefined;
      }
    }
    const imageUrlFromBody = req.body.imageUrl;
    const file = req.file;

    // Validate titleItems - required
    if (!titleItems || !Array.isArray(titleItems) || titleItems.length === 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: { titleItems: ["At least one title item is required"] },
      });
    }
    
    const titleItemsValidation = z.array(titleItemSchema).min(1, "At least one title item is required").safeParse(titleItems);
    if (!titleItemsValidation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: titleItemsValidation.error.flatten().fieldErrors,
      });
    }

    // Get existing hero or create new
    let hero = await InvestorHero.findOne();

    const updateData = {};

    // Sort and ensure order is correct for titleItems
    const sortedItems = titleItems
      .map((item, index) => ({ 
        text: item.text || '', 
        size: item.size === 'small' ? 'small' : 'normal',
        order: item.order !== undefined ? item.order : index 
      }))
      .sort((a, b) => a.order - b.order);
    updateData.titleItems = sortedItems;

    // Priority: File upload > URL update > keep existing
    if (file) {
      // If file is uploaded, use the uploaded file
      // Store as images/filename.jpg (will be served at /images/filename.jpg)
      updateData.imageUrl = `images/${file.filename}`;
    } else if (imageUrlFromBody !== undefined && imageUrlFromBody !== null && imageUrlFromBody !== '') {
      // If imageUrl is provided in request body, use it (for URL editing)
      // Remove leading slash if present, normalize to images/filename format
      let normalizedUrl = imageUrlFromBody.startsWith('/') ? imageUrlFromBody.slice(1) : imageUrlFromBody;
      // Convert from old format (uploads/images/...) to new format (images/...)
      if (normalizedUrl.startsWith('uploads/images/')) {
        normalizedUrl = normalizedUrl.replace('uploads/images/', 'images/');
      } else if (!normalizedUrl.startsWith('images/') && !normalizedUrl.startsWith('http')) {
        // If it's a relative path without images/ prefix, add it
        normalizedUrl = `images/${normalizedUrl}`;
      }
      updateData.imageUrl = normalizedUrl;
    }
    // If neither file nor imageUrl provided, keep existing imageUrl

    if (hero) {
      // Update existing
      await hero.update(updateData);
      await hero.reload(); // Reload to get updated data
    } else {
      // Create new with default titleItems if none provided
      if (!updateData.titleItems) {
        updateData.titleItems = [
          { text: "Investor", size: "small", order: 0 },
          { text: "& Relations", size: "normal", order: 1 }
        ];
      }
      hero = await InvestorHero.create(updateData);
    }

    // Ensure titleItems is sorted by order
    let sortedTitleItems = hero.titleItems || [];
    if (Array.isArray(sortedTitleItems)) {
      sortedTitleItems = sortedTitleItems.sort((a, b) => (a.order || 0) - (b.order || 0));
    } else {
      sortedTitleItems = [];
    }
    
    // If titleItems is empty, use default
    if (sortedTitleItems.length === 0) {
      sortedTitleItems = [
        { text: "Investor", size: "small", order: 0 },
        { text: "& Relations", size: "normal", order: 1 }
      ];
      // Update database with default
      hero.titleItems = sortedTitleItems;
      await hero.save();
    }

    // Return relative URL path: /images/filename.jpg
    // Images stored as "images/filename.jpg" in DB, convert to "/images/filename.jpg"
    let imageUrl = hero.imageUrl;
    if (imageUrl) {
      if (imageUrl.startsWith('http')) {
        // Keep external URLs as is
        imageUrl = imageUrl;
      } else if (imageUrl.startsWith('uploads/images/')) {
        // Convert old format to new format
        imageUrl = `/${imageUrl.replace('uploads/images/', 'images/')}`;
      } else if (imageUrl.startsWith('/')) {
        // Already has leading slash
        imageUrl = imageUrl;
      } else {
        // Add leading slash for relative path
        imageUrl = `/${imageUrl}`;
      }
    } else {
      imageUrl = null;
    }

    return res.json({
      id: hero.id,
      imageUrl: imageUrl,
      titleItems: sortedTitleItems,
      createdAt: hero.createdAt,
      updatedAt: hero.updatedAt,
    });
  } catch (error) {
    console.error("Upsert investor hero error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

