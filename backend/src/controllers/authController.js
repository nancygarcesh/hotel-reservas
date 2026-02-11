import { User, Role } from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { createUserService } from "../services/userService.js";

export const register = async (req, res, next) => {
  try {

    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ where: { email } });

    if (exists) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    const role = await Role.findOne({ where: { name: "CLIENTE" } });

    const hashed = await hashPassword(password);

    const user = await createUserService({
      name,
      email,
      password: hashed,
      phone,
      role_id: role.id
    });

    res.status(201).json(user);

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: Role
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken({
      id: user.id,
      role: user.Role.name
    });

    res.json({ token, user });

  } catch (error) {
    next(error);
  }
};