const mongoose = require('mongoose')

module.exports = function(){
    const db = `${process.env.MONGODB_URI}bookStoreDB`
    mongoose.connect(db)
        .then(() => console.log(`Connection to database established...`))
        .catch((err) => {
            console.log(err)
        })
}