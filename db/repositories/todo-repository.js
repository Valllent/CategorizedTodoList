const {Op} = require("sequelize")
const {getTodoModel} = require("../models/todo-model");


module.exports = {
    TodoRepository: {
        async selectBy(search, categoryId) {
            const whereClause = {}

            if (search) {
                whereClause.name = {
                    [Op.iLike]: "%" + search + "%"
                }
            }

            if (categoryId) {
                whereClause.categoryId = Number.parseInt(categoryId)
            }

            return await getTodoModel().findAll({
                where: whereClause
            })
        },

        async select(id) {
            return await getTodoModel().findOne({
                where: {
                    id: id
                }
            })
        },

        async insert(name, completed, categoryId) {
            return await getTodoModel().create({
                name: name,
                completed: completed,
                categoryId: categoryId
            })
        }
    }
}