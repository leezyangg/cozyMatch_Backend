const express = require('express')
const {
    getRoommates,
    getRoommate,
    addRoommate,
    deleteRoommate,
    updateRoommate
} = require('../controllers/roommateControllers')

const Roommate = require('../models/roommateModels')

const router = express.Router()

router.get('/', getRoommates)

//GET a single roommate
router.get('/:id', getRoommate)

//POST a new roommate
router.post('/', addRoommate)

//DELETE a roommate
router.delete('/:id', deleteRoommate)

//UPDATE a roommate
router.patch('/:id', updateRoommate)

module.exports = router;