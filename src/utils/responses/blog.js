const constructBlogResponse = (blog) => {
    const { content, createdAt, updatedAt, createdBy } = blog || {}
    return { content, createdAt, updatedAt, createdBy }
}
module.exports = { constructBlogResponse }