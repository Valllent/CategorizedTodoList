const express = require("express");

const apiRouter = express.Router()

apiRouter.use("/todo", require("./api/todo"))

module.exports = apiRouter;