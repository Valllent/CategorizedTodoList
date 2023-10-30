const {Sequelize} = require('sequelize');
const {initTodoEntity} = require("./repositories/todo-repository");
const {initUserEntity} = require("./repositories/users-repository");

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
        throw "DB connection failed: " + error
    }
    console.log('DB is connected successfully.')

    initTodoEntity(sequelize)
    initUserEntity(sequelize)

    try {
        await sequelize.sync()
    } catch (error) {
        throw "Tables creation failed: " + error
    }
    console.log("Tables were created successfully.")
}