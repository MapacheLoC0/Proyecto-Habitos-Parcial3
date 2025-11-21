import { Router } from "express";
import { createHabit, getHabits, getHabitById, updateHabit, deleteHabit } from "../controllers/habits.controller";
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

/**
 * @swagger
 * /api/habits:
 *   get:
 *     tags:
 *       - Hábitos
 *     summary: Obtener todos los hábitos del usuario
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de hábitos
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, getHabits);

/**
 * @swagger
 * /api/habits/{id}:
 *   get:
 *     tags:
 *       - Hábitos
 *     summary: Obtener un hábito por ID
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
 *         description: Hábito encontrado
 *       404:
 *         description: Hábito no encontrado
 */
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

export default router;
