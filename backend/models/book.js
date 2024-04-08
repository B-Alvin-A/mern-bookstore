const Joi = require('joi')
const mongoose = require("mongoose");

const { categorySchema } = require('./category')

const Book = mongoose.model('books', new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
            maxlength: 255
        },
        author:{
            type:String,
            trim: true,
            required: true,
            maxlength: 50
        },
        publishYear:{
            type:Number,
            required:true
        },
        category:{
            type: categorySchema,
            required: true
        },
        numberInStock:{
            type: Number,
            required: true,
            default:0,
            min: 0,
            max: 255
        },
        dailyRentalRate:{
            type: Number,
            required: true,
            default:0,
            min: 0,
            max: 255
        }
    },
    {
        timestamps: true
    }
))

function validateBook(book){
    const schema = Joi.object({
        title: Joi.string().required().max(255),
        author: Joi.string().required().max(50),
        publishYear: Joi.number().required(),
        categoryId: Joi.objectId().required(),
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0)
    })
    return schema.validate(book)
}

exports.Book = Book
exports.validateBook = validateBook