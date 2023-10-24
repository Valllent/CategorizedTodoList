const express = require('express')
const app = express()

const apiRoute = require("./api")
const {unknownUrl} = require("../controllers/unknown-contoller");

module.exports.initServer = async () => {
    app.use(require("morgan")("tiny"))

    app.use(express.static('./public'))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())

    app.use("/api", apiRoute)
    app.all('*', unknownUrl)

    app.listen(5000, () => {
        console.log('Server started: http://localhost:5000')
    })
}