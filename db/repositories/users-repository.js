const {getHashForPassword} = require("../../utils/password-hash");
const {getUserModel} = require("../models/user-model");


module.exports = {
    UserRepository: {
        async selectByName(name) {
            return await getUserModel().findOne({
                where: {
                    name: name
                }
            })
        },

        async selectByEmail(email) {
            return await getUserModel().findOne({
                where: {
                    email: email
                }
            })
        },

        async selectById(id) {
            return await getUserModel().findOne({
                where: {
                    id: id
                }
            })
        },

        async selectByIdAndUuid(id, sessionUuid) {
            return await getUserModel().findOne({
                where: {
                    id: id,
                    sessionUuid: sessionUuid
                }
            })
        },

        async insert(name, email, password) {
            const passwordHash = await getHashForPassword(password);
            return await getUserModel().create({
                name: name,
                email: email,
                passwordHash: passwordHash
            })
        },

        async insertSessionUuid(id, uuid) {
            const user = await this.selectById(id)
            await user.update({
                sessionUuid: uuid
            })
        }
    }
}