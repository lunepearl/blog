const { constructJWTToken } = require("../functions")
const { constructUserResponse } = require("./user")

const constructLoginResponse = async (user) => {
    const userResponse = constructUserResponse(user)
    const token = await constructJWTToken(user);
    return {
        token,
        user: userResponse
    }

}

module.exports = { constructLoginResponse }