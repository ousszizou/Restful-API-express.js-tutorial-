const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const bookRouter = require('./routes/bookRouter')
mongoose.connect('mongodb://localhost:27017/bookStore', {useNewUrlParser: true})

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/books', bookRouter)

app.listen(port, ()=>{ console.log(`http://localhost:${port}`)})