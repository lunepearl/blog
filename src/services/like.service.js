const { likeSchema, postSchema } = require("../db/mongo/schema")
const { constructLikeResponse } = require("../utils/responses/like")
const { constructErrorResponse } = require("../utils/functions")


const createLike = async (blogId, userId) => {
    const existingBlog = postSchema.findById(blogId);
    if (!existingBlog) {
        throw (constructErrorResponse(404, "Blog not found!"))
    }
    const existingLike = await likeSchema.findOne({ postId: blogId, createdBy: userId });
    if (existingLike) {
        return constructLikeResponse(existingLike);
    }
    const newLike = await likeSchema.create({ createdby: userId, postId: blogId });
    return constructLikeResponse(newLike);

}
const deleteLike = async (blogId, userId) => {
    const deletedLike = await likeSchema.findOneAndDelete({ postId: blogId, createdBy: userId })
    return true;
}

module.exports = { createLike, deleteLike }