const {DataTypes, Model} = require("sequelize")

let todoEntity

class Todo extends Model{}

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
            }
        }
        Todo.init(todoObject, {
            sequelize,
            modelName: "todoItems"
        })
        todoEntity = Todo
    },

    todoRepository: {
        async selectAll() {
            return await todoEntity.findAll()
        },

        async select(id) {
            return await todoEntity.findOne({
                where: {
                    id: id
                }
            })
        },

        async insert(name, completed) {
            return await todoEntity.create({
                name: name,
                completed: completed
            })
        }
    }
}