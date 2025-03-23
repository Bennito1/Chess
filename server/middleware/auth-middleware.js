const apiError = require("../esecptions/api-error")
const tokenServic = require("../service/token-servic")

module.exports = function (req, res, next){
    try{
        const authorizationHeader = req.headers.Authorization
        if (!authorizationHeader){
           return next(apiError.unauthorizedError())
        }
        const acsessToken = authorizationHeader.split(' ')[1]
        if(!acsessToken){
            return next(apiError.unauthorizedError())
        }

        const userData = tokenServic.validetaAccessToken(acsessToken)
        if (!userData){
            return next(apiError.unauthorizedError())
        }

        req.user =userData
        next()
    }catch(e){
        return next(apiError.unauthorizedError())
    }
}