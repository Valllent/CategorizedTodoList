const {initEnvVariables} = require("./utils/env")
const {initDatabase} = require("./db/db-initializer")
const {initServer} = require("./routes/server")

initEnvVariables()
    .then(initDatabase)
    .then(initServer)
    .catch((error) => {
        console.log("Can't start server: " + error)
    })