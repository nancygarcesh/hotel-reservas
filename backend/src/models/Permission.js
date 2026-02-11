import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Permission = sequelize.define("Permission", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  route: { type: DataTypes.STRING, allowNull: false },
  method: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "permissions",
  timestamps: false
});

export default Permission;