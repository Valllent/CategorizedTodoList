const {getTodoCategoryModel} = require("../models/todo-category-model");

module.exports = {
    TodoCategoryRepository: {
        async selectAll() {
            return await getTodoCategoryModel().findAll()
        },

        async selectByName(name) {
            return await getTodoCategoryModel().findOne({
                where: {
                    name: name
                }
            })
        },

        async selectById(id) {
            return await getTodoCategoryModel().findOne({
                where: {
                    id: id
                }
            })
        },

        async insert(name) {
            return await getTodoCategoryModel().create({
                name: name
            })
        },

        async insertDefault() {
            const item = await this.selectByName("Default");
            if (!item) {
                await this.insert("Default")
            }
        }
    }
}

