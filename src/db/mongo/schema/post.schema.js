const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
    content: {
        required: true,
        type: String
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

const postSchema = mongoose.model("Posts", Post);

module.exports = postSchema;