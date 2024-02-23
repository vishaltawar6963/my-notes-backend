const jwt = require('jsonwebtoken')
const User = require("./../models/userModels")
const asyncHandler = require("express-async-handler")

const protected = asyncHandler(async (req ,res, next) => {
    let token ;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        
        token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        decodedToken = jwt.verify(token ,process.env.JWT_SECRET)
        // console.log(decodedToken)
        req.user = await User.findById(decodedToken.id).select("-password")
        //  console.log(req.user)
         next()

    } catch (error) {
        res.status(401)
        throw new Error('Not authorized , Token failed.. ')
    }
}
if(!token){
    res.status(401)
    throw new Error('not authorized , no token ')
}

})

module.exports = {protected}