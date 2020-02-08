const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User.js')
const authMiddleWare = require('../../middleware/authmw.js')

const router = express.Router()

// POST to /api/auth/login
// Logins a new user
// PUBLIC
router.post('/login', (req, res) => {
    const { email, password } = req.body

    // Simple validation
    if( !email || !password ) return res.status(400).json({msg: 'Please fill out all forms...'})

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User doesnt exist...' })
            else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            jwt.sign({id: user.id}, 
                                config.get('jwtSecret'), 
                                { expiresIn: '1h'},
                                (err, token) => {
                                    if(err) throw err
                                    res.json({token: token, user: user})
                                })
                        }
                        else {
                            res.status(400).json({msg: 'Password invalid...'})
                        }
                    })
            }
        })        
})

// POST to /api/auth/register
// Registers a new user
// PUBLIC
router.post('/register', (req, res) => {
    const { password, email } = req.body

    //Simple validation
    if(!password || !email) return res.status(400).json({msg: 'Please fill out all forms'})

    //user info
    const newUser = new User({
        password,
        email
    })

    // validate if user already exist, if it does, return err
    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'}) 
            else {
                // encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash
                        // Save user to DB
                        newUser.save()
                            .then(user => {
                                res.json(user)
                            })
                            .catch(err => res.status(400).json({msg: err}))
                            })
                })
                
            }
        })
  
})

// GET to /api/auth
// Gets user info by token
// PRIVATE
router.get('/', authMiddleWare, (req, res) => {
    User.findById(req.userid, (err, user) => {
        if(err) throw err
        if(!user) return res.status(400).json({msg: 'User doesnt exists...'})
        else {
            res.json(user)
        }
    })
})
module.exports = router