const express = require('express')

const User = require('../../models/User.js')
const Board = require('../../models/Board.js')
const authMiddleWare = require('../../middleware/authmw.js')

const router = express.Router()

//GET Request to /api/boards/myboards
//gets all of the logged in user's boards
//PRIVATE
router.get('/myboards', authMiddleWare, (req, res) => {
    Board.find({ownerID: req.userid}, (err, boards) => {
        condBoards = boards.map(board => ({name: board.name, id: board._id}))
        res.json(condBoards)
    })
    
})

//GET Request to /api/boards/myboards/:id
//gets one of the logged in user's boards based off id
//PRIVATE
router.get('/myboards/:id', authMiddleWare, (req, res) => {
    Board.findOne({_id: req.params.id, ownerID: req.userid}, (err, board) => {
        if(!board) return res.status(400).json({msg: 'A board of this id and user doesnt exist'})
        
        res.json(board)
    })
})

//PUT Request to /api/boards/myboards/:id/update
//updates board
//PRIVATE
router.put('/myboards/:id/update', authMiddleWare, (req,res) => {
    const {name, notes} = req.body
    Board.findOneAndUpdate({_id: req.params.id, ownerID: req.userid}, {name, notes},{useFindAndModify: false, new: true}, (err, board) => {
        if(!board) return res.status(400).json({msg: 'A board of this id and user doesnt exist'})
        res.json(board)
    })
})

//DELETE Request to /api/boards/myboards/:id
//deletes board
//PRIVATE
router.delete('/myboards/:id', authMiddleWare, (req,res) => {
    Board.findByIdAndDelete({_id: req.params.id, ownerID: req.userid}, (err, board) => {
        if(!board) return res.status(400).json({msg: 'A board of this id and user doesnt exist'})
        res.json(board)
    })
})

//POST Request to /api/boards/myboards/newboard
//creates a new board
//PRIVATE
router.post('/myboards/newboard', authMiddleWare, (req, res) => {
    const { name } = req.body
    
    const newBoard = new Board({
        name, 
        ownerID: req.userid, 
        notes: []
    })

    newBoard.save()
        .then(board => {
            res.json(board)
        })
        .catch(error => {
            res.status(400).json({msg: error.message})
        })
})


module.exports = router