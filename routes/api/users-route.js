/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's name / Login
 *         email:
 *           type: string
 *           description: Email
 *         password:
 *           type: string
 *           description: Password.
 *       example:
 *         name: Valentin
 *         email: test@test.com
 *         password: "qwerty"
 *     UserLogin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's name / Login
 *         password:
 *           type: string
 *           description: Password.
 *       example:
 *         name: Valentin
 *         password: "qwerty"
 *     UserInfo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name / Login
 *         email:
 *           type: string
 *           description: Email
 *       example:
 *         name: Valentin
 *         email: test@test.com
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing Users
 *
 * /api/users/info:
 *   get:
 *     summary: Get user info
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns user info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserInfo'
 *
 * /api/users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       200:
 *         description: User registered
 *
 * /api/users/login:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in.
 */

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