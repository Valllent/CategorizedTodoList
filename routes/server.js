const express = require('express')
const app = express()
const GlobalController = require("../controllers/global-contoller");
const {initAuthentication} = require("./authentication");
const {initDocumentation} = require("../utils/documentation");

module.exports.initServer = async () => {
    app.use(require("morgan")("tiny"))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())

    initDocumentation(app)
    initAuthentication(app)

    const apiRouter = express.Router()
    apiRouter.use("/todo", require("./api/todo-route"))
    apiRouter.use("/users", require("./api/users-route"))
    apiRouter.use("/categories", require("./api/categories-route"))
    app.use("/api", apiRouter)

    app.all('*', GlobalController.unknownUrl)
    app.use(GlobalController.exceptionHandler)

    app.listen(5000, () => {
        console.log('Server started: http://localhost:5000')
    })
}