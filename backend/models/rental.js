const Joi = require('joi')
const mongoose  = require('mongoose')
// const moment = require('moment')

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            isGold:{
                type: Boolean,
                default: false
            },
            phone:{
                type: String,
                required: true,
                minlength: 10
            }
        }),
        required: true
    },
    book: {
        type: new mongoose.Schema({
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
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    }, 
    dateReturned: {
        type: Date
    }, 
    rentalFee: {
        type: Number,
        min: 0
    }
})

rentalSchema.statics.lookup = function(customerId,bookId){
    return this.findOne({
        'customer._id': customerId,
        'book._id': bookId
    })
}

// rentalSchema.methods.return = function(){
//     this.dateReturned = new Date();

//     const rentalDays = moment().diff(this.dateOut, 'days')
//     this.rentalFee = rentalDays * this.book.dailyRentalRate
// }

const Rental = mongoose.model('rentals', rentalSchema)

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        bookId: Joi.objectId().required()
    })
    return schema.validate(rental)
}

exports.Rental = Rental
exports.validateRental = validateRental