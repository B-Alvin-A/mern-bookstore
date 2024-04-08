const express = require('express')
const router = express.Router()

const { Rental,validateRental } = require('../models/rental')
const { Customer } = require('../models/customer')
const { Book } = require('../models/book')
const mongoose= require('mongoose')

router.get('/', async (req,res)=>{
    res.send(await Rental.find().sort('-dateOut'))
})

router.get('/:id', async (req,res)=>{
    const rental = await Rental.findById(req.params.id)
    if(!rental) return res.status(404).send({"meassage":"The specified rental was not found."})
    res.send(rental)
})

router.post('/', async (req,res) => {
    try {
        const { error } = validateRental(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        
        
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send({"meassage":"Invalid customer ID!!!"});
        
        const book = await Book.findById(req.body.bookId);
        if (!book) return res.status(400).send({"meassage":"Invalid book ID !!!"});
        
        if (book.numberInStock === 0) return res.status(400).send({"meassage":"Book Out Of Stock..."})
        
        const existingRental = await Rental.findOne({
            'customer._id': customer._id,
            'book._id': book._id
        })
        if(existingRental) return res.status(400).send({"message":"Rental already exists for this customer and book."})
    
        
        const rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name, 
                phone: customer.phone
            },
            book: {
                _id: book._id,
                title: book.title,
                author: book.author,
                dailyRentalRate: book.dailyRentalRate
            }
        })
        await rental.save();
        book.numberInStock--
        await book.save()
        
        res.send(rental)
    } catch (err) {
        // if (err instanceof mongoose.Error.CastError) {
        //     return res.status(400).send("Invalid request!!!...");
        // }
        res.status(500).send("Something went wrong on our end!!!...")
    }
})

module.exports = router