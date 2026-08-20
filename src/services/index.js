const { registerUser, loginUser } = require("./auth.service")
const { getBlogById, createBlog, editBlog, deleteBlog } = require("./blog.service")
const { getCommentByBlogId, createComment, editComment, deleteComment } = require("./comment.service")
const { createLike, deleteLike } = require("./like.service")
const { createShare } = require("./share.service")
const { getUserById, updateUserPassword, updateUser } = require("./user.service")




module.exports = {
    registerUser, loginUser,
    getBlogById, createBlog, editBlog, deleteBlog,
    getCommentByBlogId, createComment, editComment, deleteComment,
    createLike, deleteLike,
    createShare,
    getUserById, updateUserPassword, updateUser
}