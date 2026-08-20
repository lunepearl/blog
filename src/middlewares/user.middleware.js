const { updateUserDetailsSchema, changeUserPasswordSchema } = require("../validation")
const { constructErrorResponse } = require("../utils/functions")

const updateUserDetailsMiddleware = async (req, res, next) => {
    const body = req?.body;
    const { error } = await updateUserDetailsSchema.validate(body)
    parseJoiError(error)
    next();
}
const changeUserPasswordMiddleware = async (req, res, next) => {
    const body = req?.body;
    const { error } = await changeUserPasswordSchema.validate(body)
    parseJoiError(error)
    next();
}



module.exports = { updateUserDetailsMiddleware, changeUserPasswordMiddleware }