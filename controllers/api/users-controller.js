const validate = require("validate.js")
const constraints = require("../../utils/validation-constraints")
const {userRepository} = require("../../db/repositories/users-repository");
const {authenticate} = require("../../routes/authentication");

module.exports = {
    registerUser: async (req, res) => {
        let {name, email, password} = req.body;
        if (name && email) {
            name = name.trim()
            email = email.trim()
        }

        const error = await checkParameters(name, email, password);
        if (error) {
            res.status(400).send(error);
            return
        }

        await userRepository.insert(name, email, password)
        res.status(200).send("User created!")
    },

    logInUser: async (req, res, next) => {
        const onAuthenticationResult = (err, user) => {
            if (err) {
                clearSession(req)
                return res.status(401).send("Access denied")
            }

            if (!user) {
                clearSession(req)
                return res.status(401).send("Unauthorized user")
            }

            req.logIn(user, {}, (err) => {
                if (err) {
                    next(err);
                    return
                }
                res.status(200).send("Success")
            })
        }
        authenticate(req, res, next, onAuthenticationResult)
    },

    logOutUser: (req, res) => {
        clearSession(req)
        res.status(200).send("Success")
    },

    checkAuthenticationMiddleware: (req, res, next) => {
        if (req.isUnauthenticated()) {
            return res.status(401).send("Access denied")
        }

        next()
    },

    getUserInfo: async (req, res) => {
        res.status(200).json(req.user)
    },
}

async function checkParameters(name, email, password) {
    if (!name) {
        return "'name' parameter must be defined"
    }
    let error = validate.single(name, constraints.name);
    if (error) {
        return "'name' parsing error: " + error
    }

    if (!email) {
        return "'email' parameter must be defined"
    }
    error = validate.single(email, constraints.email);
    if (error) {
        return "'email' parsing error: " + error
    }

    if (!password) {
        return "'password' parameter must be defined"
    }
    error = validate.single(password, constraints.password);
    if (error) {
        return "'password' parsing error: " + error
    }

    const userWithTheSameName = await userRepository.selectByName(name);
    if (userWithTheSameName) {
        return "User with this name already exists"
    }

    const userWithTheSameEmail = await userRepository.selectByEmail(email);
    if (userWithTheSameEmail) {
        return "User with this email already exists"
    }
}

function clearSession(req) {
    req.logout()
}