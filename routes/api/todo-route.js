/**
 * @swagger
 * components:
 *   schemas:
 *     TodoItem:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The title of the item
 *         completed:
 *           type: boolean
 *           description: Whether you have finished it
 *         categoryId:
 *           type: integer
 *           description: The id of category the item belongs to.
 *       example:
 *         name: Do homework
 *         completed: false
 *         categoryId: 1
 */

/**
 * @swagger
 * tags:
 *   name: TodoItems
 *   description: API for managing TodoItems
 * /api/todo:
 *   get:
 *     summary: Lists all items
 *     tags: [TodoItems]
 *     parameters:
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        description:
 *          Search query.
 *      - in: query
 *        name: categoryId
 *        schema:
 *          type: int
 *        description:
 *          Category id.
 *     responses:
 *       200:
 *         description: The list of the todo items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoItem'
 *   post:
 *     summary: Create a new todo item
 *     tags: [TodoItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoItem'
 *     responses:
 *       200:
 *         description: The created todo item.
 * /api/todo/{id}:
 *   put:
 *    summary: Update the todo item by the id
 *    tags: [TodoItems]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The todo item id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TodoItem'
 *    responses:
 *      200:
 *        description: The todo item was updated
 *   delete:
 *     summary: Remove the todo item by id
 *     tags: [TodoItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo item id
 *
 *     responses:
 *       200:
 *         description: The todo item was deleted
 */



const express = require("express");
const todoController = require("../../controllers/api/todo-controller");
const tryCatch = require("../../utils/try-catch");


const router = express.Router()

router.get("/", tryCatch(todoController.getTodoList))
router.post("/", tryCatch(todoController.postTodoItem))

router.use("/:id", tryCatch(todoController.checkTodoItemIdMiddleware))
router.put("/:id", tryCatch(todoController.putTodoItem))
router.delete("/:id", tryCatch(todoController.deleteTodoItem))

module.exports = router