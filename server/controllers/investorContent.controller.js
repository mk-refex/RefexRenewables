import { z } from "zod";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { InvestorContent } from "../models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads/pdf directory exists
const uploadsPdfPath = path.join(__dirname, "../uploads/pdf");
if (!fs.existsSync(uploadsPdfPath)) {
  fs.mkdirSync(uploadsPdfPath, { recursive: true });
}

// Configure multer for PDF uploads
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/pdf");
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

// File filter for PDFs only
const pdfFileFilter = (req, file, cb) => {
  const allowedTypes = /pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'application/pdf';

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

export const uploadPDF = multer({
  storage: pdfStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for PDFs
  fileFilter: pdfFileFilter,
});

// Schema for investor content
const investorContentSchema = z.object({
  categoryId: z.string().min(1, "Category ID is required"),
  categoryName: z.string().min(1, "Category name is required"),
  content: z.object({
    sections: z.array(
      z.object({
        heading: z.string(),
        items: z.array(
          z.object({
            name: z.string(),
            fileUrl: z.string().optional(),
            isStaticContent: z.boolean().optional(),
            staticContent: z.string().optional(),
          })
        ),
      })
    ),
  }),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

// Get all investor content categories
export async function getAllInvestorContent(_req, res) {
  try {
    const contents = await InvestorContent.findAll({
      where: { isActive: true },
      order: [["displayOrder", "ASC"], ["categoryId", "ASC"]],
    });

    return res.json(
      contents.map((content) => ({
        id: content.id,
        categoryId: content.categoryId,
        categoryName: content.categoryName,
        content: content.content,
        isActive: content.isActive,
        displayOrder: content.displayOrder || 0,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
      }))
    );
  } catch (error) {
    console.error("Get all investor content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get single investor content by category ID
export async function getInvestorContentByCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const content = await InvestorContent.findOne({
      where: { categoryId, isActive: true },
    });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.json({
      id: content.id,
      categoryId: content.categoryId,
      categoryName: content.categoryName,
      content: content.content,
      isActive: content.isActive,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    });
  } catch (error) {
    console.error("Get investor content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Create or update investor content
export async function upsertInvestorContent(req, res) {
  try {
    const parse = investorContentSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const { categoryId, categoryName, content, isActive, displayOrder } = parse.data;

    // Find existing content or create new
    const [investorContent, created] = await InvestorContent.findOrCreate({
      where: { categoryId },
      defaults: {
        categoryId,
        categoryName,
        content,
        isActive: isActive !== undefined ? isActive : true,
        displayOrder: displayOrder !== undefined ? displayOrder : 0,
      },
    });

    if (!created) {
      // Update existing
      await investorContent.update({
        categoryName,
        content,
        isActive: isActive !== undefined ? isActive : investorContent.isActive,
        displayOrder: displayOrder !== undefined ? displayOrder : investorContent.displayOrder || 0,
      });
    }

    return res.json({
      id: investorContent.id,
      categoryId: investorContent.categoryId,
      categoryName: investorContent.categoryName,
      content: investorContent.content,
      isActive: investorContent.isActive,
      displayOrder: investorContent.displayOrder || 0,
      createdAt: investorContent.createdAt,
      updatedAt: investorContent.updatedAt,
    });
  } catch (error) {
    console.error("Upsert investor content error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Delete investor content
export async function deleteInvestorContent(req, res) {
  try {
    const { categoryId } = req.params;
    
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    console.log(`Attempting to delete investor content with categoryId: ${categoryId}`);
    
    const content = await InvestorContent.findOne({ where: { categoryId } });

    if (!content) {
      console.log(`Investor content with categoryId ${categoryId} not found`);
      return res.status(404).json({ message: "Content not found" });
    }

    await content.destroy();
    console.log(`Successfully deleted investor content with categoryId: ${categoryId}`);
    return res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete investor content error:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Legacy Timeline - Static Data
export async function getLegacyTimeline(_req, res) {
  try {
    // Static legacy timeline data
    const timeline = [
      {
        id: 1,
        year: "2005",
        type: "orange",
        text: "Refex Group was established with a vision to revolutionize the renewable energy sector.",
        arrowImage: null,
        align: "left",
        displayOrder: 1,
      },
      {
        id: 2,
        year: "2010",
        type: "white",
        text: "Expanded operations and established strong partnerships in the renewable energy market.",
        arrowImage: null,
        align: "left",
        displayOrder: 2,
      },
      {
        id: 3,
        year: "2015",
        type: "orange",
        text: "Launched innovative solar energy solutions and achieved significant market presence.",
        arrowImage: null,
        align: "left",
        displayOrder: 3,
      },
      {
        id: 4,
        year: "2020",
        type: "white",
        text: "Continued growth and commitment to sustainable energy solutions.",
        arrowImage: null,
        align: "left",
        displayOrder: 4,
      },
      {
        id: 5,
        year: "2024",
        type: "orange",
        text: "Leading the renewable energy revolution with cutting-edge technology and sustainable practices.",
        arrowImage: null,
        align: "left",
        displayOrder: 5,
      },
    ];

    return res.json(timeline);
  } catch (error) {
    console.error("Get legacy timeline error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Upload PDF file
export async function uploadPDFFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF file provided" });
    }

    // Return the file URL in the format /pdf/filename.pdf
    const fileUrl = `/pdf/${req.file.filename}`;
    
    return res.json({
      success: true,
      fileUrl: fileUrl,
      filename: req.file.filename,
      message: "PDF uploaded successfully",
    });
  } catch (error) {
    console.error("Upload PDF error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
