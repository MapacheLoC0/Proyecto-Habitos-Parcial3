import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (data: any) => {
  const exists = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (exists) throw new Error("El correo ya está registrado");

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: { ...data, password: hashed },
  });

  return user;
};

export const login = async (data: any) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) throw new Error("Usuario no encontrado");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Contraseña incorrecta");

  return generateToken(Number(user.id));
};
