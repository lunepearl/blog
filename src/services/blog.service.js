const { postSchema } = require("../db/mongo/schema")
const { constructBlogResponse } = require("../utils/responses/blog")
const { constructErrorResponse } = require("../utils/functions")

const getBlogById = async (id) => {
    const blogPost = await postSchema.findById(id).populate('Users')
    if (!blogPost) {
        throw (constructErrorResponse(404, "Blog post not found!"))
    }
    const response = constructBlogResponse(blogPost);
    return response;
}

const createBlog = async (userId, body) => {
    const newBlog = await postSchema.create({ createdBy: userId, ...body });
    const blogResponse = getBlogById(newBlog?._id)
    return blogResponse;
}

const editBlog = async (id, body) => {
    const blogDetails = await postSchema.findById(id, { _id })
    if (!blogDetails) {
        throw (constructErrorResponse(404, "Blog post not found!"))
    }
    const createdBlog = await postSchema.findByIdAndUpdate(id, body, { returnDocument: "after" });
    const response = constructBlogResponse(createdBlog)
    return response;
}

const deleteBlog = async (id) => {
    const deletedBlog = await postSchema.findByIdAndDelete(id)
    return true;
}





module.exports = { getBlogById, createBlog, editBlog, deleteBlog }