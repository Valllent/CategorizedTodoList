const {Sequelize} = require('sequelize');
const TodoCategoryModel = require("./models/todo-category-model");
const TodoModel = require("./models/todo-model");
const UserModel = require("./models/user-model");
const {TodoCategoryRepository} = require("./repositories/todo-category-repository");

module.exports.initDatabase = async () => {
    const sequelize = new Sequelize({
        dialect: "postgres",
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    });

    try {
        await sequelize.authenticate()
    } catch (error) {
        throw Error("DB connection failed: " + error)
    }
    console.log('DB is connected successfully.')

    UserModel.init(sequelize)
    TodoCategoryModel.init(sequelize)
    TodoModel.init(sequelize)

    try {
        await sequelize.sync()

        await TodoCategoryRepository.insertDefault()
    } catch (error) {
        throw Error("Tables creation failed: " + error)
    }
    console.log("Tables were created successfully.")
}