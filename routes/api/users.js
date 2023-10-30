const express = require("express");
const usersController = require("../../controllers/api/users-controller");

const router = express.Router()

router.post("/register", usersController.registerUser)
router.post("/logout", usersController.logOutUser)
router.post("/login", usersController.logInUser)

router.get("/info", usersController.checkAuthenticationMiddleware)
router.get("/info", usersController.getUserInfo)

module.exports = router