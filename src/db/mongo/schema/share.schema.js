
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Share = new Schema({
    postId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date
    },
    createdBy: { type: Schema.Types.ObjectId, },
});

const shareSchema = mongoose.model('Shares', Share);

module.exports = { shareSchema };