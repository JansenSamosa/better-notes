const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User