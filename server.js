const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

mongoose.connect(config.get('mongoURI'), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
    .then(() => console.log('MongoDB running'))
    .catch(err => console.log(err))

app.use('/api/auth', require('./routes/api/auth.js'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))