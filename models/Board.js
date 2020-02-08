const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Untitled'
    },
    ownerID: {
        type: String,
        required: true
    },
    notes: {
        type: Array,
        default: []
    }
})

const Board = mongoose.model('board', BoardSchema)

module.exports = Board