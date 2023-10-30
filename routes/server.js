const express = require('express')
const app = express()
const {unknownUrl} = require("../controllers/unknown-contoller");
const {initAuthentication} = require("./authentication");

module.exports.initServer = async () => {
    app.use(require("morgan")("tiny"))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(express.static('./public'))

    initAuthentication(app)

    const apiRouter = express.Router()
    apiRouter.use("/todo", require("./api/todo"))
    apiRouter.use("/users", require("./api/users"))
    app.use("/api", apiRouter)

    app.all('*', unknownUrl)

    app.listen(5000, () => {
        console.log('Server started: http://localhost:5000')
    })
}