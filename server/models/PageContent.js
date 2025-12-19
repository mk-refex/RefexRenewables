import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class PageContent extends Model {
  constructor(values, options) {
    super(values, options);
  }
}

PageContent.init(
  {
    pageId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      comment: "Page identifier (e.g., 'about-us', 'home', 'investor-relations')",
    },
    pageName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Display name of the page",
    },
    sectionId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Section identifier within the page (e.g., 'Hero', 'Team Members')",
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
      comment: "JSON structure containing the page content",
    },
  },
  {
    sequelize,
    modelName: "PageContent",
    tableName: "page_contents",
    indexes: [
      {
        fields: ["pageId", "sectionId"],
        unique: true,
        name: "unique_page_section",
      },
    ],
  }
);

