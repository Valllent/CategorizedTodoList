/**
 * @swagger
 * components:
 *   schemas:
 *     TodoCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The title of the item
 *       example:
 *         name: My home tasks
 */

/**
 * @swagger
 * tags:
 *   name: TodoCategories
 *   description: API for managing TodoCategories
 * /api/categories:
 *   get:
 *     summary: List of all todo categories
 *     tags: [TodoCategories]
 *     responses:
 *       200:
 *         description: The list of the todo categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoCategory'
 *   post:
 *     summary: Create a new todo category
 *     tags: [TodoCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoCategory'
 *     responses:
 *       200:
 *         description: The created todo category.
 * /api/todo/{id}:
 *   delete:
 *     summary: Remove the todo category by id
 *     tags: [TodoCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo category id
 *
 *     responses:
 *       200:
 *         description: The todo category was deleted
 */

const express = require("express");
const categoriesController = require("../../controllers/api/categories-controller");
const tryCatch = require("../../utils/try-catch");


const router = express.Router()

router.get("/", tryCatch(categoriesController.getCategories))
router.post("/", tryCatch(categoriesController.postCategory))
router.delete("/:id", tryCatch(categoriesController.deleteCategory))

module.exports = router