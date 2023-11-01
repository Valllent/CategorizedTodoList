const {DataTypes, Model} = require("sequelize");


const TABLE_NAME = "todoCategories"
const todoCategoryObject = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}

class TodoCategory extends Model {
}

let model

module.exports = {
    init: (sequelize) => {
        model = TodoCategory.init(todoCategoryObject, {
            sequelize,
            modelName: TABLE_NAME
        })
    },

    getTodoCategoryModel: () => model
}