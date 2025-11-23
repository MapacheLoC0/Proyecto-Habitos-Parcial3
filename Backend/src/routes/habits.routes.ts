// Backend/src/routes/habits.routes.ts
import { Router } from "express";
import { 
  createHabit, 
  getHabits, 
  getHabitById, 
  updateHabit, 
  deleteHabit, 
  markProgress,
  getProgress
} from "../controllers/habits.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/habits:
 *   post:
 *     tags:
 *       - Hábitos
 *     summary: Crear un nuevo hábito
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hacer ejercicio
 *     responses:
 *       201:
 *         description: Hábito creado exitosamente
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, createHabit);

router.get("/", authMiddleware, getHabits);

// IMPORTANTE: Esta ruta debe ir ANTES de /:id
router.get("/progress", authMiddleware, getProgress);

router.get("/:id", authMiddleware, getHabitById);

/**
 * @swagger
 * /api/habits/{id}:
 *   put:
 *     tags:
 *       - Hábitos
 *     summary: Actualizar un hábito
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hábito actualizado
 *       404:
 *         description: Hábito no encontrado
 */
router.put("/:id", authMiddleware, updateHabit);

/**
 * @swagger
 * /api/habits/{id}:
 *   delete:
 *     tags:
 *       - Hábitos
 *     summary: Eliminar un hábito
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
 *         description: Hábito eliminado
 *       404:
 *         description: Hábito no encontrado
 */
router.delete("/:id", authMiddleware, deleteHabit);

/**
 * @swagger
 * /api/habits/{id}/progress:
 *   post:
 *     tags:
 *       - Hábitos
 *     summary: Marcar progreso en un hábito
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
 *         description: Progreso registrado
 *       400:
 *         description: Ya se marcó progreso hoy
 */
router.post("/:id/progress", authMiddleware, markProgress);

/**
 * @swagger
 * /api/habits/progress:
 *   get:
 *     tags:
 *       - Hábitos
 *     summary: Obtener progreso de todos los hábitos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de progreso
 */
router.get("/progress", authMiddleware, getProgress);

export default router;