const {TodoRepository} = require("../../db/repositories/todo-repository")
const {TodoCategoryRepository} = require("../../db/repositories/todo-category-repository");

module.exports = {
    getTodoList: async (req, res) => {
        const {search, categoryId} = req.query;

        const todoList = await TodoRepository.selectBy(search, categoryId)
        res.status(200).json({
            success: true,
            data: todoList
        });
    },

    postTodoItem: async (req, res) => {
        const {name, completed, category} = req.body;
        if (!name) {
            return res.status(400).send("Please provide 'name' parameter!")
        }

        let completedValue = false;
        if (completed === "true" || completed === true) {
            completedValue = true;
        }

        let categoryId
        if (category) {
            if (!Number.isInteger(category)) {
                return res.status(400).send("Category is not a number!")
            }

            categoryId = Number.parseInt(category);
            const todoCategory = await TodoCategoryRepository.selectById(categoryId)
            if (!todoCategory) {
                return res.status(400).send(`Can't find category with id ${categoryId}`)
            }
        } else {
            const defaultCategory = await TodoCategoryRepository.selectByName("Default");
            console.log(JSON.stringify(defaultCategory))
            if (defaultCategory) {
                categoryId = defaultCategory.id
            }
        }

        await TodoRepository.insert(name, completedValue, categoryId)
        res.status(201).send("Successfully added: " + name)
    },

    checkTodoItemIdMiddleware: async (req, res, next) => {
        const {id} = req.params

        const todoItemId = parseInt(id);
        if (!todoItemId) {
            res.status(400).send(`Can't parse item id: ${id}!`)
            return;
        }

        const todoItem = await TodoRepository.select(todoItemId)
        if (!todoItem) {
            res.status(400).send(`Can't find item with id: ${todoItemId}`)
            return;
        }
        req.todoItem = todoItem
        next()
    },

    putTodoItem: async (req, res) => {
        const {todoItem} = req

        const {name, completed, category} = req.body
        if (name) {
            todoItem.name = name
        }

        if (completed === "true" || completed === true) {
            todoItem.completed = true
        } else if (completed === "false" || completed === false) {
            todoItem.completed = false
        }

        if (category && Number.isInteger(category)) {
            const categoryItem = TodoCategoryRepository.selectById(category)
            if (categoryItem) {
                todoItem.categoryId = categoryItem.id
            }
        }

        await todoItem.save()
        res.status(201).send("Todo item changed!")
    },

    deleteTodoItem: async (req, res) => {
        const {todoItem} = req

        await todoItem.destroy()
        res.status(201).send("Todo item removed!")
    }
}