import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class InvestorHero extends Model {
  constructor(values, options) {
    super(values, options);
  }
}

InvestorHero.init(
  {
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "URL path to the uploaded hero image (stored in uploads folder)",
    },
    titleItems: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      comment: "Ordered array of title text items: [{ text: string, size: 'small' | 'normal', order: number }]",
    },
  },
  {
    sequelize,
    modelName: "InvestorHero",
    tableName: "investor_hero",
    indexes: [
      {
        unique: true,
        fields: ["id"], // Ensure only one hero entry exists
      },
    ],
  }
);

