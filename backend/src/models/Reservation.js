import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Reservation = sequelize.define("Reservation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  room_id: { type: DataTypes.INTEGER, allowNull: false },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  end_date: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM("pendiente","confirmada","cancelada","completada"),
    defaultValue: "pendiente"
  }
}, {
  tableName: "reservations",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

export default Reservation;