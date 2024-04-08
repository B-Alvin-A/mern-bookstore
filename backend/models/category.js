const Joi = require('joi')
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 5,
        maxlenght: 50
    }
})

const Category = mongoose.model('categories', categorySchema)

function validateCategory(category){
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50)
    })
    return schema.validate(category)
}

exports.categorySchema = categorySchema
exports.Category = Category
exports.validateCategory = validateCategory