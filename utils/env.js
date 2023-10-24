const dotenv = require("dotenv")

module.exports.initEnvVariables = async () => {
    dotenv.config({
        path: "./config.env"
    })

    const requiredFields = [
        process.env.PGUSER,
        process.env.PGHOST,
        process.env.PGPASSWORD,
        process.env.PGDATABASE,
        process.env.PGPORT,
    ]
    for (const field of requiredFields) {
        if (!field) {
            throw "Create config.env file with required fields."
        }
    }
}