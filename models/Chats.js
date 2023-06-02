const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    userID: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    allChat: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Chat', chatSchema)