const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    Room_ID: Number,
    propertyName: String,
    address: String,
    type: String,
    furnishing: String,
    rentalFee: Number,
    vacancy: Number,
    bedroom: Number,
    bathroom: Number,
    parking: Number,
    availability: Boolean,
    postedDate: Date,
    facilities: Array,
    description: String,
    image: String,
    video: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("rooms", postSchema);