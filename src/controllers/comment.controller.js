const { getCommentByBlogId: getCommentByBlogIdService, createComment: createCommentService, editComment: editCommentService, deleteComment: deleteCommentService } = require("../services")
const { constructErrorResponse, createReturnError, createSucessResponse } = require("../utils/functions")

const getCommentByBlogId = async (req, res) => {
    try {
        const blogId = req?.params.id;
        const blogComment = await getCommentByBlogIdService(blogId)
        createSucessResponse(res, blogComment, 201);
        return;
    } catch (error) {
        return createReturnError(error, res)
    }
}
const createComment = async (req, res) => {
    try {
        const authDetails = req?.auth;
        const userId = authDetails?.id;
        const body = req?.body;
        const blogId = req?.params.id;
        const newComment = await createCommentService(blogId, userId, body)
        createSucessResponse(res, newComment, 201);
        return;
    } catch (error) {
        return createReturnError(error, res);
    }
}
const editComment = async (req, res) => {
    try {
        const authDetails = req?.auth;
        const userId = authDetails?.id;
        const body = req?.body;
        const commentId = req?.params.id;
        const editedComment = await editCommentService(commentId, userId, body)
        createSucessResponse(res, editedComment, 201);
        return;
    } catch (error) {
        return createReturnError(error, res)
    }
}
const deleteComment = async (req, res) => {
    try {
        const authDetails = req?.auth;
        const userId = authDetails?.id;
        const commentId = req?.params.id;
        const deletedComment = await deleteCommentService(commentId, userId)
        return true;
    } catch (error) {
        return createReturnError(error, res)
    }
}


module.exports = { getCommentByBlogId, createComment, editComment, deleteComment }