const argon2 = require("argon2")
const { userSchema } = require("../db/mongo/schema")
const { hashPassword, verifyHashedPassword, constructErrorResponse } = require("../utils/functions")
const { constructUserResponse } = require("../utils/responses/user")
const { client } = require("../db/redis")

const INCORRECT_PASSWORD_MESSAGE = "Incorrect password!"

const constructUserRedisKey = (id) => {
    return `user:${id}`;
}

const getUserById = async (id) => {
    const redisUser = await client.get(constructUserRedisKey(id))
    if (redisUser){
        const response = constructUserResponse(JSON.parse(redisBlogPost));
        return response;
    }
    const user = await userSchema.findById(id)
    console.log(user, id)
    await client.get (constructUserRedisKey(id))
    const userResponse = constructUserResponse(user)
    return userResponse;
}

const updateUser = async (id, body) => {
    const newUserDetails = await userSchema.findByIdAndUpdate(id, body, { returnDocument: "after" })
    await client.set(constructUserRedisKey(id))
    const userResponse = constructUserResponse(newUserDetails)
    return userResponse;
}

const updateUserPassword = async (id, body) => {
    const { oldPassword, password } = body || {}
    const oldUserPassword = await userSchema.findById(id, { password: true })

    if (!oldUserPassword) {
        throw (constructErrorResponse(401, "INCORRECT_PASSWORD_MESSAGE"))
    }
    const isPasswordVerified = verifyHashedPassword(oldUserPassword?.password, oldPassword);

    if (!isPasswordVerified) {
        throw (constructErrorResponse(401, "INCORRECT_PASSWORD_MESSAGE"))
    }

    if (oldPassword === password) {
        throw (constructErrorResponse(401, "New password must not be the same as the old password!"))
    }

    const hashedPassword = await hashPassword(password)
    await userSchema.findByIdAndUpdate(id, { password: hashedPassword })
    return true;
}

module.exports = { getUserById, updateUserPassword, updateUser }