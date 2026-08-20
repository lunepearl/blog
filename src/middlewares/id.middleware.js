
const { constructErrorResponse, parseJoiError } = require("../utils/functions")
const { idSchema } = require("../validation")

const idMiddleware = (req, res, next) => {
    try {
        const id = req?.params.id;
        const { error } = idSchema.validate({ id })
        parseJoiError(error);
        next();
    } catch (error) {
        console.log(JSON.stringify(error))
        res.status(400).json(error)
    }
}

module.exports = { idMiddleware }