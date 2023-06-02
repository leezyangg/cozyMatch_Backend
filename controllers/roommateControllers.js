const Roommate = require('../models/roommateModels')
const mongoose = require('mongoose')

// get all roommates
const getRoommates = async (req, res) => {
    const roommates = await Roommate.find({})
    res.status(200).json(roommates)
}

// get a single roommate
const getRoommate = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such roommate' })
    }

    const roommate = await Roommate.findById(id)

    if (!roommate) {
        return res.status(404).json({ error: 'No such roommate' })
    }

    res.status(200).json(roommate)
}

// add a new roommate
const addRoommate = async (req, res) => {
    const { name, occupation, cleanRoomFrequency, address, smoking, pet, drink, isEarly, distanceFromCollege, renterFee } = req.body

    // add doc to db
    try {
        const roommate = await Roommate.create({ name, occupation, cleanRoomFrequency, address, smoking, pet, drink, isEarly, distanceFromCollege, renterFee })
        res.status(200).json(roommate)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a roommate
const deleteRoommate = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such roommate' })
    }

    const roommate = await Roommate.findOneAndDelete({ _id: id })

    if (!roommate) {
        return res.status(404).json({ error: 'No such roommate' })
    }

    res.status(200).json(roommate)

}

// update a roommate
const updateRoommate = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such roommate' })
    }

    const roommate = await Roommate.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!roommate) {
        return res.status(404).json({ error: 'No such roommate' })
    }

    res.status(200).json(roommate)
}


module.exports = {
    getRoommates,
    getRoommate,
    addRoommate,
    deleteRoommate,
    updateRoommate
}