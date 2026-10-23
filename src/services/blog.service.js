const { postSchema } = require("../db/mongo/schema")
const { constructBlogResponse } = require("../utils/responses/blog")
const { constructErrorResponse } = require("../utils/functions")
const {client} = require("../db/redis")

const constructBlogRedisKey = (id) => {
    return `blog:${id}`;
}

const getBlogById = async (id) => {
    const redisBlogPost = await client.get(constructBlogRedisKey(id))
    if(redisBlogPost){
         const response = constructBlogResponse(JSON.parse(redisBlogPost));
        return response;
    }
    const blogPost  = await postSchema.findById(id).populate('Users')
    if (!blogPost) {
        throw (constructErrorResponse(404, "Blog post not found!"))
    }
    await client.set(constructBlogRedisKey(id), JSON.stringify(blogPost))
    const blogResponse = constructBlogResponse(blogPost);
    return blogResponse;
}

const createBlog = async (userId, body) => {
    const newBlog = await postSchema.create({ createdBy: userId, ...body })
    await client.set(constructBlogRedisKey(id), newBlog)
    const blogResponse = getBlogById(newBlog?._id)
    return blogResponse;
}

const editBlog = async (id, body) => {
   
    const blogDetails = await postSchema.findById(id, { _id })
    if (!blogDetails) {
        throw (constructErrorResponse(404, "Blog details not found!"))
    }
    const createdBlog = await postSchema.findByIdAndUpdate(id, body, { returnDocument: "after" });

    await client.del(constructBlogRedisKey(id))
    await client.set(constructBlogRedisKey(id), JSON.stringify(createdBlog))
    const blogResponse = constructBlogResponse(createdBlog)
    return blogResponse;
}

const deleteBlog = async (id) => {
    await client.del(constructBlogRedisKey(id))
   
     await postSchema.findByIdAndDelete(id)
    return true;
}





module.exports = { getBlogById, createBlog, editBlog, deleteBlog }