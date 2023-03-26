const express = require('express')
const routes = express.Router()

const defaultController = require("../controller/controller")

routes.get("/search", defaultController.search)
routes.post("/create", defaultController.create)


module.exports = routes;