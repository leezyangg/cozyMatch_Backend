const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roommateSchema = new Schema({
    roommate_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    cleanRoomFrequency: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    smoking: {
        type: Boolean,
        required: true
    },
    pet: {
        type: Boolean,
        required: true
    },
    drink: {
        type: Boolean,
        required: true
    },
    drink: {
        type: Boolean,
        required: true
    },
    isEarly: {
        type: Boolean,
        required: true
    },
    distanceFromCollege: {
        type: Number,
        required: true
    },
    renterFee: {
        type: Number,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Roommate', roommateSchema)