const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt')

const { User } = require('../models/user')

router.post('/',async (req,res) => {
    const { error } = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send({"message":"Invalid Email address or Password!!!"})

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send({"message":"Invalid Email address or Password!!!"})

    const token = user.generateAuthToken() 
    res.send(token)
})

function validateUser(req){
    const schema = Joi.object({
        email: Joi.string().required().max(255).email(),
        password: Joi.string().required().trim()
    })
    return schema.validate(req)
}

module.exports = router