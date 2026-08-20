const express = require("express")
const { getBlogById, createBlog, editBlog, deleteBlog } = require("../controllers/blog.controller")
const { blogMiddleware, idMiddleware, authenticateUserMiddleware, isAdminMiddleWare } = require("../middlewares")

const blogRouter = express.Router();
blogRouter.get("/blog/:id", idMiddleware, getBlogById)
blogRouter.post("/blog", authenticateUserMiddleware, isAdminMiddleWare, createBlog)
blogRouter.patch("/blog/:id", authenticateUserMiddleware, isAdminMiddleWare, idMiddleware, editBlog)
blogRouter.delete("/blog/:id", authenticateUserMiddleware, isAdminMiddleWare, idMiddleware, deleteBlog)


module.exports = { blogRouter }