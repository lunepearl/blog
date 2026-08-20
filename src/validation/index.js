const { loginSchema, registerSchema } = require("./auth.validation");
const { blogSchema } = require("./blog.validation");
const { commentSchema } = require("./comment.validation");
const { idSchema } = require("./id.validation");
const { updateUserDetailsSchema, changeUserPasswordSchema } = require("./user.validation");

module.exports = {
    loginSchema, registerSchema,
    blogSchema,
    commentSchema,
    idSchema,
    updateUserDetailsSchema, changeUserPasswordSchema

}