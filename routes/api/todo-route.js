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