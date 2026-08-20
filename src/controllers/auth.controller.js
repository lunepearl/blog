const { registerUser: registerUserService, loginUser: loginUserService } = require("../services")
const { hashPassword } = require("../utils/functions")
const { constructLoginResponse } = require("../utils/responses/auth")
const { constructErrorResponse, createReturnError, createSucessResponse } = require("../utils/functions");


const loginUser = async (req, res) => {
    try {
        const body = req?.body;
        const userData = await loginUserService(body)
        createSucessResponse(res, userData, 201);
        return;
    } catch (error) {
        return createReturnError(error, res)
    }
}

const registerUser = async (req, res) => {

    try {
        const body = req?.body;
        const newUserData = await registerUserService(body)
        createSucessResponse(res, newUserData, 201);
        return;
    } catch (error) {
        console.log(error)
        return createReturnError(error, res)
    }
}


module.exports = { loginUser, registerUser }