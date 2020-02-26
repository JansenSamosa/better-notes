const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.json())

mongoose.connect(config.get('mongoURI'), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
    .then(() => console.log('MongoDB running'))
    .catch(err => console.log(err))

app.use('/api/auth', require('./routes/api/auth.js'))
app.use('/api/boards', require('./routes/api/board.js'))

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))