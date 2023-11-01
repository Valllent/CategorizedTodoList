const {DataTypes, Model} = require("sequelize");
const {getTodoCategoryModel} = require("./todo-category-model");


const TABLE_NAME = "todoItems"
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

class Todo extends Model {
}

let model

module.exports = {
    init: (sequelize) => {
        model = Todo.init(todoObject, {
            sequelize,
            modelName: TABLE_NAME
        })
        const TodoCategory = getTodoCategoryModel()
        if (!TodoCategory) {
            throw Error("TodoCategory table must be initialized earlier Todo table")
        }
        Todo.belongsTo(TodoCategory, {foreignKey: "categoryId"})
    },

    getTodoModel: () => model
}