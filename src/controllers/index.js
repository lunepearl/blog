const { loginUser, registerUser } = require("./auth.controller")
const { getBlogById, createBlog, editBlog, deleteBlog } = require("./blog.controller")
const { getCommentByBlogId, createComment, editComment, deleteComment } = require("./comment.controller")
const { getUserById, updateUser, updateUserPassword } = require("./user.controller")


module.exports = {
    loginUser, registerUser,
    getBlogById, createBlog, editBlog, deleteBlog,
    getCommentByBlogId, createComment, editComment, deleteComment,
    getUserById, updateUser, updateUserPassword
}