const bcrypt = require("bcrypt");

module.exports = {
    getHashForPassword: async (password) => {
        return bcrypt.hash(password, 10)
    },
    compareHashWithPassword: async(password, hash) => {
        return bcrypt.compare(password, hash)
    }
}