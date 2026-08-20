const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        required: true,
        type: String,
    },
    slug: {
        required: true,
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const categorySchema = mongoose.model('BlogCategories', Category);

module.exports = categorySchema;