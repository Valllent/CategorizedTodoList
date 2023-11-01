const express = require("express");
const usersController = require("../../controllers/api/users-controller");
const tryCatch = require("../../utils/try-catch");


const router = express.Router()

router.post("/register", tryCatch(usersController.registerUser))
router.post("/logout", tryCatch(usersController.logOutUser))
router.post("/login", tryCatch(usersController.logInUser))

router.get("/info", tryCatch(usersController.checkAuthenticationMiddleware))
router.get("/info", tryCatch(usersController.getUserInfo))

module.exports = router