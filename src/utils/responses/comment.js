const constructCommentResponse = (comment) => {
    const { content, createdAt, updatedAt, createdBy } = comment || {}
    return { content, createdAt, updatedAt, createdBy }
}

module.exports = { constructCommentResponse }