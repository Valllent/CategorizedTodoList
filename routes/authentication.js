const passport = require("passport")
const cookieSession = require("cookie-session")
const {userRepository} = require("../db/repositories/users-repository");
const {compareHashWithPassword} = require("../utils/password-hash");
const LocalStrategy = require("passport-local").Strategy;


async function checkLoginAndPassword(req, name, password, done) {
    const user = await userRepository.selectByName(name);

    if (!user) {
        return done(null, false);
    }

    const correctPassword = await compareHashWithPassword(password, user.passwordHash)
    if (!correctPassword) {
        return done("Username or password is incorrect", null);
    }

    return done(null, user);
}

async function serializeUser(user, done) {
    return done(null, user.id)
}

async function deserializeUser(id, done) {
    const user = await userRepository.selectById(id);

    if (!user) {
        return done(new Error("No user with such id"))
    }

    return done(null, {
        id: user.id,
        name: user.name,
        email: user.email
    })
}

const STRATEGY_NAME = "local"

module.exports = {
    initAuthentication: (app) => {
        app.use(cookieSession({
            name: "app-auth",
            keys: ["secret-key*1", "secret-key#2"],
            maxAge: 60 * 60 * 24
        }))

        app.use(passport.initialize({}))
        app.use(passport.session({}))

        passport.serializeUser(serializeUser)
        passport.deserializeUser(deserializeUser)

        const strategy = new LocalStrategy(
            {
                usernameField: "name",
                passwordField: "password",
                passReqToCallback: true
            },
            checkLoginAndPassword
        )
        passport.use(STRATEGY_NAME, strategy);
    },

    authenticate: (req, res, next, onAuthenticationResult) => {
        const authenticate = passport.authenticate(
            STRATEGY_NAME,
            {},
            onAuthenticationResult
        )
        authenticate(req, res, next)
    }
}