const express = require("express")
const { getCommentByBlogId, createComment, editComment, deleteComment } = require("../controllers/comment.controller")
const { commentMiddleware, idMiddleware, authenticateUserMiddleware } = require("../middlewares")

const commentRouter = express.Router();
commentRouter.get("/comment/:id", idMiddleware, getCommentByBlogId)
commentRouter.post("/comment", authenticateUserMiddleware, createComment)
commentRouter.patch("/comment/:id", idMiddleware, authenticateUserMiddleware, editComment)
commentRouter.delete("/comment/:id", idMiddleware, authenticateUserMiddleware, deleteComment)


module.exports = { commentRouter }