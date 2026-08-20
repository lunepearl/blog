
const express = require("express")
const { authRouter } = require("../routes/auth.route")
const { blogRouter } = require("../routes/blog.route")
const { commentRouter } = require("../routes/comment.route")
const { userRouter } = require("../routes/user.route")

const generalRoute = express.Router();
generalRoute.use(authRouter)
generalRoute.use(blogRouter)
generalRoute.use(commentRouter)
generalRoute.use(userRouter)

module.exports = generalRoute 