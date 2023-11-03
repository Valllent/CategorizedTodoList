const {DataTypes, Model} = require("sequelize");


const TABLE_NAME = "users"
const userObject = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sessionUuid: {
        type: DataTypes.STRING,
        allowNull: true
    }
}


class User extends Model{}

let model

module.exports = {
    init: (sequelize) => {
        model = User.init(userObject, {
            sequelize,
            modelName: TABLE_NAME
        })
    },

    getUserModel: () => model
}