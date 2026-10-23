const { shareSchema} = require("../db/mongo/schema")
const { constructShareResponse, constructShareCountResponse} = require("../utils/responses/share")
const { constructErrorResponse  } = require("../utils/functions")
const {client} = require ("../db/redis")

const constructShareRedisKey = (id) =>{
     return `share:${id}`;
}
const createShare = async (blogId, userId) => {
    const newShare = await shareSchema.create({ postId: blogId, createdBy: userId })
    const shareResponse = constructShareResponse(newShare?._blogId)
    return shareResponse;
}

const getTotalShares = async (postId) => {
    const redisShareCount = await client.get(constructShareRedisKey(id))
    if (redisShareCount) {
        const response = constructShareCountResponse(JSON.parse(redisShareCount))
        return response;
    }
    const shareCount = await shareSchema.countDocuments({postId})
    await client.set(constructShareRedisKey(id), JSON.stringify(shareCount))
    const shareResponse = constructShareCountResponse(shareCount)
    return shareResponse;


}

module.exports = { createShare, getTotalShares }