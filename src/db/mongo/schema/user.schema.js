const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: "{VALUE} is not a valid role option"
        },
        default: "user"
    }
})

const userSchema = mongoose.model('Users', User);

module.exports = userSchema;