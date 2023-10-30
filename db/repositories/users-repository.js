const {DataTypes, Model} = require("sequelize")
const {getHashForPassword} = require("../../utils/password-hash");

let userEntity

class User extends Model{

}

module.exports = {
    initUserEntity(sequelize) {
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
            }
        }
        User.init(userObject, {
            sequelize,
            modelName: "users"
        })
        userEntity = User
    },

    userRepository: {
        async selectByName(name) {
            return await userEntity.findOne({
                where: {
                    name: name
                }
            })
        },

        async selectByEmail(email) {
            return await userEntity.findOne({
                where: {
                    email: email
                }
            })
        },

        async selectById(id) {
            return await userEntity.findOne({
                where: {
                    id: id
                }
            })
        },

        async insert(name, email, password) {
            const passwordHash = await getHashForPassword(password);
            return await userEntity.create({
                name: name,
                email: email,
                passwordHash: passwordHash
            })
        },
    }
}