const { commentSchema } = require("../db/mongo/schema")
const { constructCommentResponse } = require("../utils/responses/comment")
const { constructErrorResponse } = require("../utils/functions")
const {client} = require ("../db/redis")

const constructCommentRedisKey = (id) => {
    return `comment:${id}`;
}

const getCommentByBlogId = async (blogId) => {
    const redisBlogComment= await client.get (constructCommentRedisKey(id))
    if (redisBlogComment){
        const response = constructCommentResponse(JSON.parse(redisBlogComment));
        return response;
    }
    const blogComment = await commentSchema.find({ postId: blogId }).populate('Users')
await client.set (constructCommentRedisKey(id), JSON.stringify(blogComment))
    const commentResponse = blogComment.map(constructCommentResponse);
    return commentResponse;
}
const createComment = async (blogId, userId, body) => {
    const newComment = await commentSchema.create({ createdby: userId, postId: blogId, ...body });
    await client.set(constructCommentRedisKey(id), newComment)
    const commentResponse = getCommentByBlogId(newComment?._blogId)
    return commentResponse;
}

const editComment = async (commentId, userId, body) => {
    const commentDetails = await commentSchema.findById(commentId, { createdBy })
    if (JSON.stringify(commentDetails?.createdBy) !== JSON.stringify(userId)) {
        throw (constructErrorResponse(403, "Forbidden!"))
    }
    await client.del(constructCommentRedisKey(id))
    const updatedCommentDetails = await commentSchema.findByIdAndUpdate(commentId, body);
    if (!updatedCommentDetails) {
        throw (constructErrorResponse(404, "blog comment not found"))
    }
    await client.set (constructCommentRedisKey(id), SON.stringify(updatedCommentDetails))
    const commentResponse = constructCommentResponse(updatedCommentDetails)
    return commentResponse;
}
const deleteComment = async (commentId, userId) => {
    await client.del(constructCommentRedisKey(id))
     await commentSchema.findOneAndDelete({ userId, commentId });
    return true;
}


module.exports = { getCommentByBlogId, createComment, editComment, deleteComment }