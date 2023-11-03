const passport = require("passport")
const cookieSession = require("cookie-session")
const {UserRepository} = require("../db/repositories/users-repository");
const {compareHashWithPassword} = require("../utils/password-hash");
const LocalStrategy = require("passport-local").Strategy;
const Uuid = require("uuid")


async function checkLoginAndPassword(req, name, password, done) {
    const user = await UserRepository.selectByName(name);

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
    const uuid = Uuid.v4();
    await UserRepository.insertSessionUuid(user.id, uuid)

    const result = {
        id: user.id,
        uuid: uuid
    }
    return done(null, result)
}

async function deserializeUser(data, done) {
    const {id, uuid} = data;
    const user = await UserRepository.selectByIdAndUuid(id, uuid);

    if (!user) {
        return done(new Error("No user with such data"))
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