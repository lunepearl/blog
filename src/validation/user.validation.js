const joi = require("joi");
const { constructErrorResponse } = require("../utils/functions");

const updateUserDetailsSchema = joi.object({
    name: joi.string().required().messages({
        "any.required": "please provide a name",
        "string.base": "name can only be string",
        "string.empty": "name can not be empty"
    }),

})
const changeUserPasswordSchema = joi.object({
    oldPassword: joi.string().required().messages({
        "any.required": "please provuide your old password",
        "string.base": "password can only contain string",
        "string.empty": "password cant be empty"
    }),
    newUserPassword: joi.string().required().messages({
        "any.required": "please provide a valid new password",
        "any.invalid": "new password can not be the same as the old password",
        "string.min": "new password must be atleast 8 characters long",
        " string.base": "new password must contain atleast one uppercase letter, one lowercase letter, one number, and one special character"
    })
})
module.exports = { updateUserDetailsSchema, changeUserPasswordSchema }