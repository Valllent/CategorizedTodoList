const {DataTypes, Model} = require("sequelize")

let todoCategoryEntity

class TodoCategory extends Model{}

module.exports = {
    initTodoCategoryEntity: (sequelize) => {
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
        TodoCategory.init(todoCategoryObject, {
            sequelize,
            modelName: "todoCategories"
        })
        todoCategoryEntity = TodoCategory
    },

    todoCategoryRepository: {

        async selectAll() {
            return await todoCategoryEntity.findAll()
        },

        async selectByName(name) {
            return await todoCategoryEntity.findOne({
                where: {
                    name: name
                }
            })
        },

        async selectById(id) {
            return await todoCategoryEntity.findOne({
                where: {
                    id: id
                }
            })
        },

        async insert(name) {
            return await todoCategoryEntity.create({
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

