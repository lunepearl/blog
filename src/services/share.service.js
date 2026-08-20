const { shareScheme } = require("../db/mongo/schema")
const { constructShareResponse } = require("../utils/responses/share")
const { constructErrorResponse } = require("../utils/functions")

const createShare = async (blogId, userId) => {
    const newShare = await shareSchema.create({ postId: blogId, createdBy: userId })
    const response = constructShareResponse(newShare?._blogId)
    return response;
}

module.exports = { createShare }