import { Router } from "express";
import { createRoutine, getRoutines, getRoutineById, updateRoutine, deleteRoutine } from "../controllers/routines.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/routines:
 *   post:
 *     tags:
 *       - Rutinas
 *     summary: Crear una nueva rutina
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Rutina matutina
 *     responses:
 *       201:
 *         description: Rutina creada exitosamente
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, createRoutine);

/**
 * @swagger
 * /api/routines:
 *   get:
 *     tags:
 *       - Rutinas
 *     summary: Obtener todas las rutinas del usuario
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutinas
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, getRoutines);

/**
 * @swagger
 * /api/routines/{id}:
 *   get:
 *     tags:
 *       - Rutinas
 *     summary: Obtener una rutina por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rutina encontrada
 *       404:
 *         description: Rutina no encontrada
 */
router.get("/:id", authMiddleware, getRoutineById);

/**
 * @swagger
 * /api/routines/{id}:
 *   put:
 *     tags:
 *       - Rutinas
 *     summary: Actualizar una rutina
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rutina actualizada
 *       404:
 *         description: Rutina no encontrada
 */
router.put("/:id", authMiddleware, updateRoutine);

/**
 * @swagger
 * /api/routines/{id}:
 *   delete:
 *     tags:
 *       - Rutinas
 *     summary: Eliminar una rutina
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rutina eliminada
 *       404:
 *         description: Rutina no encontrada
 */
router.delete("/:id", authMiddleware, deleteRoutine);

export default router;
