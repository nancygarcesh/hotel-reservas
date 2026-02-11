import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Room = sequelize.define("Room", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  room_number: { type: DataTypes.STRING, unique: true, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  price_per_night: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  description: { type: DataTypes.TEXT },
  amenities: { type: DataTypes.TEXT },
  images: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM("libre","ocupada","mantenimiento","reservada"),
    defaultValue: "libre"
  }
}, {
  tableName: "rooms",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

export default Room;