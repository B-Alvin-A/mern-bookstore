const jwt = require('jsonwebtoken')

function auth( req,res,next ){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send({"message":"Access denied!!!. No token provided."})

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey)
        req.user = decoded
        next()
    } catch(err){
        res.status(400).send({"meassge":"Invalid token!!! Access Denied."})    
    }
}

module.exports = auth