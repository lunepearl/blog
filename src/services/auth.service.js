const { userSchema } = require("../db/mongo/schema");
const { hashPassword, verifyHashedPassword, constructErrorResponse } = require("../utils/functions")
const { constructLoginResponse, } = require("../utils/responses/auth")

const INVALID_LOGIN_MESSAGE = "Incorrect password or email detected!";

const getUserByEmail = async (email) => {
    return await userSchema.findOne({ email })
}
const loginUser = async (body) => {
    const { email, password } = body || {};
    const userData = await getUserByEmail(email)
    if (!userData) {
        throw (constructErrorResponse(401, INVALID_LOGIN_MESSAGE));
    }
    const isPasswordValid = verifyHashedPassword(userData?.password, password);
    if (!isPasswordValid) {
        throw (constructErrorResponse(401, INVALID_LOGIN_MESSAGE));
    }
    const response = await constructLoginResponse(userData)
    return response;

}

const registerUser = async (body) => {
    const { email, password: sentPassword, name } = body || {};

    const existingUserData = await getUserByEmail(email)

    if (existingUserData) {
        throw (constructErrorResponse(409, "User already exist!"))
    }
    const password = await hashPassword(sentPassword);
    console.log(password)

    const newUserData = await userSchema.create({ email, password, name });

    const response = await constructLoginResponse(newUserData)
    return response;
}


module.exports = { registerUser, loginUser }