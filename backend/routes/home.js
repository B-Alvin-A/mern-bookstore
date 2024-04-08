const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.send('Bookstore server here...')
})

module.exports=router