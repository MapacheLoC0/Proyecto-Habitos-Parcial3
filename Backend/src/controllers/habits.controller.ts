import { Request, Response } from "express";
import * as habitService from "../services/habits.services";
import prisma from "../config/prisma";

export const createHabit = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }
    
    const habit = await habitService.createHabit(userId, req.body);
    res.json(habit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const habits = await habitService.getHabits(userId);
    res.json(habits);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getHabitById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const habit = await habitService.getHabitById(Number(id), userId);
    if (!habit) return res.status(404).json({ error: "Hábito no encontrado" });
    res.json(habit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const habit = await habitService.updateHabit(Number(id), userId, req.body);
    res.json(habit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const result = await habitService.deleteHabit(Number(id), userId);

    if (result.count === 0) {
      return res.status(404).json({ error: "Hábito no encontrado" });
    }

    res.json({ message: "Hábito eliminado" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const markProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // Verificar si ya se marcó hoy
    const existing = await prisma.progress.findFirst({
      where: {
        habitId: Number(id),
        date: today
      }
    });

    if (existing) {
      return res.status(400).json({ error: "Ya marcaste progreso hoy." });
    }

    // Crear progreso del día
    await prisma.progress.create({
      data: {
        habitId: Number(id),
        date: today,
      },
    });

    res.json({ message: "Progreso registrado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al marcar progreso" });
  }
};

export const getProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const habits = await prisma.habit.findMany({
      where: { userId: userId }, // Ya es number
      include: {
        progress: true,
      }
    });

    const mapped = habits.map(h => ({
      habitId: h.id,
      name: h.name,
      count: h.progress.length
    }));

    res.json(mapped);
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ error: "Error al obtener progreso" });
  }
};