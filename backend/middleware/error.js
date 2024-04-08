const mongoose = require('mongoose')
// const logger = require('../startup/logging')

module.exports = function (err, req, res, next){
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({"message":"Invalid request!!!..."});
    }

    // logger.error({
    //     message:err.message,
    //     stack: err.stack,
    //     error: err
    // })
    res.status(500).send({"message":"Something went wrong on our end!!!..."});
}