import { Request, Response } from "express";
import * as routineService from "../services/routines.services";

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const routine = await routineService.createRoutine(String(req.user?.id), req.body);
    res.json(routine);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const routines = await routineService.getRoutines(String(req.user?.id));
    res.json(routines);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoutineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routine = await routineService.getRoutineById(Number(id), String(req.user?.id));
    if (!routine) return res.status(404).json({ error: "Rutina no encontrada" });
    res.json(routine);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routine = await routineService.updateRoutine(Number(id), String(req.user?.id), req.body);
    res.json(routine);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routine = await routineService.deleteRoutine(Number(id), String(req.user?.id));
    res.json({ message: "Rutina eliminada", routine });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
