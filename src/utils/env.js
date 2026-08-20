const passwordSalt = process?.env?.PASSWORD_SALT
const passwordSecret = process?.env?.PASSWORD_SECRET
const jwtSecret = process?.env?.JWT_SECRET
const mongoUri = process?.env?.MONGO_URI
const port = process?.env?.PORT

const envs = {
    port,
    passwordSalt,
    passwordSecret,
    jwtSecret,
    mongoUri,
}

module.exports = envs