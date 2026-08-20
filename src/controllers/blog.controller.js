const { getBlogById: getBlogByIdService, createBlog: createBlogService, editBlog: editBlogService, deleteBlog: deleteBlogService } = require("../services");
const { constructErrorResponse, createReturnError, createSucessResponse } = require("../utils/functions");

const getBlogById = async (id) => {
    try {
        const id = req?.param.id;
        const blogPost = await getBlogByIdService(id)
        createSucessResponse(res, blogPost, 201);
        return;
    } catch (error) {
        return createReturnError(error, res);
    }
}
const createBlog = async (req, res) => {
    try {
        const authDetails = req?.auth;
        const userId = authDetails?.id
        const body = req?.body;
        const createdBlog = await createBlogService(userId, body)
        createSucessResponse(res, createdBlog, 201);
        return;
    } catch (error) {
        return createReturnError(error, res);
    }
}
const editBlog = async (req, res) => {
    try {
        const body = req?.body;
        const id = req?.params.id;
        const editedBlog = await editBlogService(id, body)
        createSucessResponse(res, editedBlog, 201);
        return;
    } catch (error) {
        return createReturnError(error, res)
    }
}
const deleteBlog = async (req, res) => {
    try {
        const id = req?.params.id;
        const deletedBlog = await deleteBlogService(id)
        return true;
    } catch (error) {
        return createReturnError(error, res)
    }
}

module.exports = { getBlogById, createBlog, editBlog, deleteBlog }