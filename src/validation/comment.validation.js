const joi = require("joi")
const commentSchema = joi.object({
    content: joi.string().required().messages({
        "any.required": "please provide a comment",
        "string.base": "comment can only be string",
        "string.empty": "comment can not be empty"
    })
})

module.exports = { commentSchema }