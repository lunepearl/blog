const constructShareResponse = (share) => {
    const { postId, createdAt, updatedAt, createdBy } = share || {}
    return { postId, createdAt, updatedAt, createdBy }
}

const constructShareCountResponse = (shareCount) => {
    return {shareCount }
}

module.exports = { constructShareResponse, constructShareCountResponse }

