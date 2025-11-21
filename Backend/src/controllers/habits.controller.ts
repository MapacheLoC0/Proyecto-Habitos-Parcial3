import { Request, Response } from "express";
import * as habitService from "../services/habits.services";

export const createHabit = async (req: Request, res: Response) => {
  try {
    const habit = await habitService.createHabit(String(req.user?.id), req.body);
    res.json(habit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    const habits = await habitService.getHabits(String(req.user?.id));
    res.json(habits);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getHabitById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const habit = await habitService.getHabitById(Number(id), String(req.user?.id));
    if (!habit) return res.status(404).json({ error: "Hábito no encontrado" });
    res.json(habit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const habit = await habitService.updateHabit(Number(id), String(req.user?.id), req.body);
    res.json(habit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const habit = await habitService.deleteHabit(Number(id), String(req.user?.id));
    res.json({ message: "Hábito eliminado", habit });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
