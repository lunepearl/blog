constructShareResponse = (share) => {
    const { postId, createdAt, updtaedAt, createdBy } = share || {}
    return { postId, createdAt, updatedAt, createdBy }
}
module.exports = { constructShareResponse }