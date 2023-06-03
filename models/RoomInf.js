const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    Room_ID: { type: Number, required: true },
    propertyName: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    postedDate: { type: Date, required: true },
    rentalFee: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    parking: { type: Number, required: true },
    availability: { type: Boolean, required: true },
});

module.exports = mongoose.model('Room', roomSchema);
