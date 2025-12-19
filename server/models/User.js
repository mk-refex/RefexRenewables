import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class User extends Model {
  constructor(values, options) {
    super(values, options);
  }
}

User.init(
  {
    // Sequelize will add an auto-increment `id` primary key by default
    username: { type: DataTypes.STRING(255), allowNull: true, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null, // null means all permissions (for admins), array of menu item IDs for regular users
    },
    lastActive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    recentPages: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [], // Array of { pageId, pageName, accessedAt }
    },
  },
  { sequelize, modelName: "User", tableName: "users" }
);
