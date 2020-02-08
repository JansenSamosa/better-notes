const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User.js')

const authMiddleWare = (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({msg:'no token provided, authorization denied...'})
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.userid = decoded.id        
    } catch(e) {
        return res.status(401).json({msg:'token invalid, authorization denied...'})
        
    }
    next()
}

module.exports = authMiddleWare