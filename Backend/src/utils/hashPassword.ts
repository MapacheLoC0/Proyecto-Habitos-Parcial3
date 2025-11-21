import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
