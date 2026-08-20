const joi = require("joi")
const idSchema = joi.object({
    id: joi.string().required().messages({
        "any.required": "Please provide the id for this blog",
        "string.base": "please provide a valid id ",
        "string.empty": "id can not be blank",
    }),
}).required().unknown(false).messages({
    "any.require": "Please provide a id"
})
module.exports = { idSchema }