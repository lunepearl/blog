const jose = require("jose")
const joi = require("joi")
const argon2 = require("argon2")
const { passwordSalt, jwtSecret, passwordSecret } = require("./env")

const constructPassword = (password) => {
    return `${passwordSalt}-${password}-${passwordSalt}`
}

const getPasswordSecretBuffer = () => {
    return Buffer.from(passwordSecret, 'utf8')
}

const hashPassword = async password => {
    console.log(password)
    const constructedPassword = constructPassword(password)
    console.log("construcyed", constructedPassword)
    const secretBuffer = getPasswordSecretBuffer()
    const hashedPassword = await argon2.hash(constructedPassword, { secret: secretBuffer, type: argon2.argon2id, })
    return hashedPassword
}

const verifyHashedPassword = async (hash, password) => {
    try {
        const constructedPassword = constructPassword(password)
        const secretBuffer = getPasswordSecretBuffer();
        const isPasswordVerified = await argon2.verify(hash, constructedPassword, { secret: secretBuffer })
        return isPasswordVerified;
    } catch (error) {
        throw error;
    }
}

const getJWTPayload = (user) => {
    const { email, name, role, id } = user || {}
    return {
        email, name, role, id
    }
}

const constructUnit8Array = () => {
    return new TextEncoder().encode(jwtSecret);
}

const constructJWTToken = async (user) => {
    try {

        const JWTPayload = getJWTPayload(user)
        const token = await new jose.EncryptJWT(JWTPayload)
            .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .encrypt(constructUnit8Array())

        return token;
    } catch (error) {
        throw error;

    }

}

const verifyJWTToken = async (token) => {
    try {
        const { payload } = await jose.jwtDecrypt(token, constructUnit8Array())
        const nowDate = new Date()
        const expiryTime = ((payload?.exp || 0) * 1000)

        if (expiryTime < nowDate) {
            console.log("date comparison", payload?.exp, nowDate.getTime())
            return null
        }
        return payload;
    } catch (error) {
        return null

    }
}

const parseJoiError = (error) => {

    if (!error) {
        return;
    }

    const errors = {}
    const errorDetails = error?.details;
    if (errorDetails && Array.isArray(errorDetails)) {
        errorDetails.forEach((details) => {
            errors[details?.context?.key] = details?.message
        })
    }
    throw (errors)
}
const constructErrorResponse = (statusCode, message) => {
    return { statusCode, message }
}

const createReturnError = (error, res) => {
    res.status(error?.statusCode || 500).json({ message: error?.message })
}

const createSucessResponse = (res, data, statusCode) => {
    res.status(statusCode || 200).json({ data })
}


module.exports = {
    hashPassword,
    verifyHashedPassword,
    constructJWTToken,
    verifyJWTToken,
    constructErrorResponse,
    parseJoiError,
    createReturnError,
    createSucessResponse
} 