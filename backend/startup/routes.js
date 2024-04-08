const error = require('../middleware/error')

const express = require('express')

const cors = require('cors')
const credentials = require('../middleware/credentials')
const corsOptions = require('../config/corsOptions')

const home = require('../routes/home')
const categories = require('../routes/categories')
const books = require('../routes/books')
const customers = require('../routes/customers')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')

module.exports = function(app){
    app.use(credentials)
    app.use(cors(corsOptions))
    app.use(express.json())
    app.use('/', home)
    app.use('/api/categories', categories)
    app.use('/api/books', books)
    app.use('/api/customers', customers)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error)
}