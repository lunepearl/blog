
const { constructErrorResponse, parseJoiError } = require("../utils/functions")
const { blogSchema } = require("../validation")

const blogMiddleware = async (req, res, next) => {
    const body = req?.body;
    const { error } = await blogSchema.validate(body);
    parseJoiError(error)
    next();
}


module.exports = { blogMiddleware }