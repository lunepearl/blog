const { commentSchema } = require("../validation")
const { constructErrorResponse, parseJoiError } = require("../utils/functions")


const commentMiddleware = async (req, res, next) => {
    const body = req?.body;
    const { error } = await commentSchema.validate(body);
    parseJoiError(error)
    next();
}

module.exports = { commentMiddleware }