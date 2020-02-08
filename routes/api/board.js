const express = require('express')

const User = require('../../models/User.js')
const Board = require('../../models/Board.js')
const authMiddleWare = require('../../middleware/authmw.js')

const router = express.Router()

//GET Request to /api/boards/myboards
//gets all of the logged in user's boards
//PRIVATE
router.get('/api/boards/myboards', authMiddleWare, (req, res) => {
    res.end()
})

module.exports = router