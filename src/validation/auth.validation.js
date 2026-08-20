const joi = require("joi")
const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        "any.required": "please provide your valid email",
        "string.base": "email can only be string",
        "string.empty": " email can not be empty"
    }),
    password: joi.string().required().messages({
        "any.required": "please provide your password",
        "string.base": "password can only be string ",
        "string.empty": "password can not be empty"
    })

})
const registerSchema = joi.object({
    email: joi.string().email().required().messages({
        "any.required": "please peovide your email",
        "string.base": "email can only contain string",
        "string.empty": "email can not be empty"
    }),
    password: joi.string().required().messages({
        "any.required": "please provide a pasword",
        "string.base": "password can only be string ",
        "string.empty": "password can not be empty"
    }),
    name: joi.string().required().messages({
        "any.required": "please provide your name",
        "string.base": "name can only contain string",
        "string.empty": "name can not be empty"
    })
})
module.exports = { loginSchema, registerSchema }