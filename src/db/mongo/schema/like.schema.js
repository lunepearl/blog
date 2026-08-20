
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Like = new Schema({
    content: {
        required: true,
        type: String
    },
    postId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Posts",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
});

const likeSchema = mongoose.model('Likes', Like);

module.exports = likeSchema;