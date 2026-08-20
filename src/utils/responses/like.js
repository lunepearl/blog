const constructLikeResponse = (like) => {
    const { content, createdAt, updatedAt, createdBy } = like || {}
    return { content, createdAt, updatedAt, createdBy }
}
module.exports = { constructLikeResponse }