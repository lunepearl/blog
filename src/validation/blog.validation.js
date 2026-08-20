const joi = require("joi")
const blogSchema = joi.object({
    content: joi.string().required().messages({
        "any.required": "provide a content for this blog",
        "string.base": "content can only be string",
        "sting.empty": "content can not be empty"
    })
})
module.exports = { blogSchema }