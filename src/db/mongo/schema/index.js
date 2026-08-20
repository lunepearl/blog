
const userSchema = require("./user.schema")
const categorySchema = require("./category.schema")
const postSchema = require("./post.schema")
const likeSchema = require("./like.schema")
const shareSchema = require("./share.schema")
const commentSchema = require("./comment.schema")


module.exports = {
    userSchema,
    categorySchema,
    commentSchema,
    postSchema,
    likeSchema,
    shareSchema
}