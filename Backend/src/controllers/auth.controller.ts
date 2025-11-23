import { Request, Response } from "express";
import * as authService from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    return res.json({ token });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
