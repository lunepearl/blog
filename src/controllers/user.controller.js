const { getUserById: getUserByIdService, updateUserPassword: updateUserPasswordService, updateUser: updateUserService } = require("../services")
const { constructErrorResponse, createReturnError, createSucessResponse } = require("../utils/functions")

const getUserById = async (req, res) => {
    try {
        const id = req?.auth?.id;
        const user = await getUserByIdService(id);
        createSucessResponse(res, user, 200);
        return;
    } catch (error) {
        return createReturnError(error, res);
    }
}
const updateUser = async (req, res) => {
    try {
        const authDetails = req?.auth;
        const userId = authDetails?.id;
        const body = req?.body;
        const newUserDetails = await updateUserService(userId, body);
        createSucessResponse(res, newUserDetails, 201);
        return;
    } catch (error) {
        return createReturnError(error, res);
    }
}
const updateUserPassword = async (req, res) => {
    try {
        const authDetails = req?.auth;
        const userId = authDetails?.id
        const body = req?.body;
        const { oldPassword, password } = body || {}
        const updatedUserPassword = await updateUserPasswordService(userId, body);
        createSucessResponse(res, updatedUserPassword, 204);
        return;
    } catch (error) {
        return createReturnError(error, res);
    }

}


module.exports = { getUserById, updateUser, updateUserPassword }