const express = require('express')
const router = express.Router()

const { Category,validateCategory } = require('../models/category')

const auth = require('../middleware/auth')

router.get('/', async(req,res) => {
    res.send(await Category.find().sort('name'))
})

router.get('/:id', async(req,res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send({"message":"Category not found"})
    res.send(category)
})

router.post('/', auth, async(req,res) => {
    const { error } = validateCategory(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let category = await Category.findOne({ name: req.body.name })
    if( category ) return res.status(400).send({"message":"Category already exists"})

    category = new Category({
        name:req.body.name
    })
    await category.save()
    res.send(category)
})

router.put('/:id', async(req,res) => {
    const { error } = validateCategory(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let category = await Category.findOne({ name: req.body.name })
    if( category ) return res.status(400).send({"message":"Update failed!!!Category already exists"})

    category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name
        },
        { new: true }        
    )
    if(!category) return res.status(404).send({"message":"Category ID doesn't exist"})
    res.send(category)
})

router.delete('/:id', async(req,res) => {
    const category = await Category.findByIdAndDelete(req.params.id)
    if(!category) return res.status(404).send({ "message": "CategoryID does not exist!!!" })
    res.send(category)
})

module.exports = router