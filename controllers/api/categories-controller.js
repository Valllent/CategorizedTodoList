const {todoCategoryRepository} = require("../../db/repositories/todo-category-repository");
const validate = require("validate.js");
const constraints = require("../../utils/validation-constraints");

module.exports = {
    getCategories: async (req, res) => {
        const todoList = await todoCategoryRepository.selectAll()
        res.status(200).json({
            success: true,
            data: todoList
        });
    },

    postCategory: async (req, res) => {
        const {name} = req.body;

        if (!name) {
            return res.status(400).send("Please provide 'name' parameter!")
        }
        let error = validate.single(name, constraints.name);
        if (error) {
            return res.status(400).send("'name' parsing error: " + error)
        }

        if (await todoCategoryRepository.selectByName(name)) {
            return res.status(400).send("Already exists item with this ids")
        }

        await todoCategoryRepository.insert(name)
        res.status(201).send("Successfully added category: " + name)
    },

    deleteCategory: async (req, res) => {
        const {id} = req.params

        const categoryId = parseInt(id);
        if (!categoryId) {
            return res.status(400).send(`Can't parse item id: ${id}!`)

        }
        const category = await todoCategoryRepository.selectById(categoryId)
        if (!category) {
            return res.status(400).send(`Can't find item with id: ${categoryId}`)
        }

        await category.destroy()
        res.status(201).send("Category removed!")
    },
}