const express = require('express')
const router = express.Router()

const _ = require('lodash')
const bycrypt = require('bcrypt')

const { User,validateUser } = require('../models/user')
const auth = require('../middleware/auth')

router.get('/me', auth, async(req,res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/', async(req,res) => {
    const { error } = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email:req.body.email })
    if(user) return res.status(400).send({ "meassge":"Email already in use" })

    user = new User(_.pick(req.body, ['name','email','password','isAdmin']))

    const salt = await bycrypt.genSalt(10)
    user.password = await bycrypt.hash(user.password, salt)

    await user.save()

    const token = user.generateAuthToken()

    res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name','email']))
})

module.exports = router