const { commentSchema } = require("../db/mongo/schema")
const { constructCommentResponse } = require("../utils/responses/comment")
const { constructErrorResponse } = require("../utils/functions")

const getCommentByBlogId = async (blogId) => {
    const blogComment = await commentSchema.find({ postId: blogId }).populate('Users')

    const response = blogComment.map(constructCommentResponse);
    return response;
}
const createComment = async (blogId, userId, body) => {
    const newComment = await commentSchema.create({ createdby: userId, postId: blogId, ...body });
    const commentResponse = getCommentByBlogId(newComment?._blogId)
    return commentResponse;
}

const editComment = async (commentId, userId, body) => {
    const commentDetails = await commentSchema.findById(commentId, { createdBy })
    if (JSON.stringify(commentDetails?.createdBy) !== JSON.stringify(userId)) {
        throw (constructErrorResponse(403, "Forbidden!"))
    }
    const updatedCommentDetails = await commentSchema.findByIdAndUpdate(commentId, body);
    if (!updatedCommentDetails) {
        throw (constructErrorResponse(404, "blog comment not found"))
    }
    const response = constructCommentResponse(updatedCommentDetails)
    return response;
}
const deleteComment = async (commentId, userId) => {
    const deletedBlogComment = await commentSchema.findOneAndDelete({ userId, commentId });
    return true;
}


module.exports = { getCommentByBlogId, createComment, editComment, deleteComment }