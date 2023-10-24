const {todoRepository} = require("../../db/repositories/todo-repository")

module.exports = {
    getTodoList: (req, res) => {
        todoRepository
            .selectAll()
            .then((todoList) => {
                res.status(200).json({
                    success: true,
                    data: todoList
                });
            })
    },

    postTodoItem (req, res) {
        const {name, completed} = req.body;
        if (!name) {
            res.status(400).send("Please provide 'name' parameter!")
            return
        }

        let newCompletedValue = false;
        if (completed === "true" || completed === true) {
            newCompletedValue = true;
        }

        todoRepository
            .insert(name, newCompletedValue)
            .then(() => {
                res.status(201).send("Successfully added: " + name)
            })
    },

    checkTodoItemIdMiddleware: (req, res, next) => {
        const {id} = req.params

        const todoItemId = parseInt(id);
        if (!todoItemId) {
            res.status(400).send(`Can't parse item id: ${id}!`)
            return;
        }

        todoRepository
            .select(todoItemId)
            .then((todoItem) => {
                if (!todoItem) {
                    res.status(400).send(`Can't find item with id: ${todoItemId}`)
                    return;
                }
                req.todoItem = todoItem
                next()
            })
    },

    putTodoItem: (req, res) => {
        const {todoItem} = req

        const {name, completed} = req.body
        if (name) {
            todoItem.name = name
        }

        if (completed === "true" || completed === true) {
            todoItem.completed = true
        } else if (completed === "false" || completed === false) {
            todoItem.completed = false
        }

        todoItem
            .save()
            .then(() => {
                res.status(201).send("Todo item changed!")
            })
    },

    deleteTodoItem: (req, res) => {
        const {todoItem} = req

        todoItem
            .destroy()
            .then(() => {
                res.status(201).send("Todo item removed!")
            })
    }
}