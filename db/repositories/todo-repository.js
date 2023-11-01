const {DataTypes, Model, Op} = require("sequelize")

let todoEntity

class Todo extends Model {
}

module.exports = {
    initTodoEntity(sequelize) {
        const todoObject = {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }
        Todo.init(todoObject, {
            sequelize,
            modelName: "todoItems"
        })
        const TodoCategory = sequelize.models.todoCategories;
        if (!TodoCategory) {
            throw Error("TodoCategory table must be initialized earlier Todo table")
        }
        Todo.belongsTo(TodoCategory, {foreignKey: "categoryId"})
        todoEntity = Todo
    },

    todoRepository: {
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

            return await todoEntity.findAll({
                where: whereClause
            })
        },

        async select(id) {
            return await todoEntity.findOne({
                where: {
                    id: id
                }
            })
        },

        async insert(name, completed, categoryId) {
            return await todoEntity.create({
                name: name,
                completed: completed,
                categoryId: categoryId
            })
        }
    }
}