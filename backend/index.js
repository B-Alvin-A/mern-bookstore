require('express-async-errors')
const express = require('express'); 
const app = express();

require('./startup/config')()
require('./startup/db')()
require('./startup/routes')(app)
require('./startup/clientDataValidation')()

const port = process.env.PORT || 7500

const server = app.listen(port, () => console.log(`Listening on port ${port}...`))
module.exports = server