import Role from "./Role.js";
import Permission from "./Permission.js";
import User from "./User.js";
import Room from "./Room.js";
import Reservation from "./Reservation.js";
import sequelize from "../database/connection.js";

Role.belongsToMany(Permission, {
  through: "roles_permissions",
  foreignKey: "role_id"
});

Permission.belongsToMany(Role, {
  through: "roles_permissions",
  foreignKey: "permission_id"
});

Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

User.hasMany(Reservation, { foreignKey: "user_id" });
Reservation.belongsTo(User, { foreignKey: "user_id" });

Room.hasMany(Reservation, { foreignKey: "room_id" });
Reservation.belongsTo(Room, { foreignKey: "room_id" });

export {
  sequelize,
  Role,
  Permission,
  User,
  Room,
  Reservation
};