import { User } from "../models/index.js";

export async function getOverview(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get all users to calculate active users today
    const allUsers = await User.findAll({
      attributes: ["lastActive"],
    });

    // Calculate active users today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeToday = allUsers.filter((user) => {
      if (!user.lastActive) return false;
      return new Date(user.lastActive) >= today;
    }).length;

    // Fixed values for pages and sections
    const totalPages = 15;
    const totalSections = 45;

    // Get recent pages from user's recentPages array
    const user = await User.findByPk(userId, {
      attributes: ["recentPages"],
    });

    const recentPages = Array.isArray(user?.recentPages) ? user.recentPages : [];
    
    // Return last 5 pages
    const formattedPages = recentPages.slice(0, 5).map((page) => ({
      id: page.pageId,
      name: page.pageName,
      accessedAt: page.accessedAt,
    }));

    return res.json({
      stats: {
        totalPages,
        published: totalPages,
        totalSections,
        activeToday,
      },
      recentPages: formattedPages,
    });
  } catch (error) {
    console.error("Get overview error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

