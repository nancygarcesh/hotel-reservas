import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Role = sequelize.define("Role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
}, {
  tableName: "roles",
  timestamps: false
});

export default Role;