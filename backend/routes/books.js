const express = require('express')
const router = express.Router()

const { Book, validateBook } = require('../models/book')
const { Category } = require('../models/category')

router.get('/', async(req,res) => {
    res.send(await Book.find().sort('title'))
})

router.get('/:id', async(req,res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({"message":"Book not found"})
    res.send(book)
})

router.post('/', async(req,res) => {
    const { error } = validateBook(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)
    if(!category) return res.status(400).send({"message":"Invalid Category!!!"})
    
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
        category: {
            _id: category._id,
            name: category.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await book.save()
    res.send(book)
})

router.put('/:id', async(req,res) => {
    const{ error } = validateBook(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        const category = await Category.findById(req.body.categoryId)
        if(!category) return res.status(400).send({"message":"Invalid BookID!!!"})
    
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.title,
                category:{
                    _id:category.id,
                    name: category.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            },
            { new: true }        
        )
        if(!book) return res.status(404).send({"message":"Book ID doesn't exist"})
        res.send(book)
})

router.delete('/:id', async(req,res) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    if(!book) return res.status(404).send({"message":"Book ID doesn't exist"})   
    res.send(book)
})

module.exports = router