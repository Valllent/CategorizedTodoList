const express = require("express");
const {getTodoList, postTodoItem, putTodoItem, deleteTodoItem, checkTodoItemIdMiddleware} = require("../../controllers/api/todo-controller");

const router = express.Router()

router.get("/", getTodoList)
router.post("/", postTodoItem)

router.use("/:id", checkTodoItemIdMiddleware)
router.put("/:id", putTodoItem)
router.delete("/:id", deleteTodoItem)

module.exports = router