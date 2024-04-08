const token = process.env.jwtPrivateKey

module.exports = function(){
    if(!token){
        throw new error('FATAL ERROR: unable to get web token key...')
    }
}