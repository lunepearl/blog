const { authenticateUserMiddleware, registerUserMiddleWare, loginUserMiddleware, isAdminMiddleWare } = require("./auth.middleware")
const { blogMiddleware } = require("./blog.middleware")
const { commentMiddleware } = require("./comment.middleware")
const { idMiddleware } = require("./id.middleware")
const { updateUserDetailsMiddleware, changeUserPasswordMiddleware } = require("./user.middleware")

module.exports = {
    authenticateUserMiddleware, registerUserMiddleWare, loginUserMiddleware,
    blogMiddleware,
    commentMiddleware,
    idMiddleware, isAdminMiddleWare,
    updateUserDetailsMiddleware, changeUserPasswordMiddleware
} 