import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class InvestorContent extends Model {
  constructor(values, options) {
    super(values, options);
  }
}

InvestorContent.init(
  {
    categoryId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      comment: "Unique identifier for the category (e.g., 'annual-reports', 'shareholding')",
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Display name of the category",
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
      comment: "JSON structure: { sections: [{ heading: string, items: [{ name: string, fileUrl: string }] }] }",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Order in which categories should be displayed",
    },
  },
  {
    sequelize,
    modelName: "InvestorContent",
    tableName: "investor_contents",
    indexes: [
      {
        fields: ["categoryId"],
        unique: true,
      },
    ],
  }
);

