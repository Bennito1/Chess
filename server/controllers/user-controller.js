const client = require("../config/db")
const userService = require("../service/user-service")
const {validationResult, cookie} = require("express-validator")
const apiError = require('../esecptions/api-error')
const cookieParser = require('cookie-parser');
class UserController{
    async registration(req, res, next){
        try{
            const errors =validationResult(req);
            if(!errors.isEmpty()){
                return next(apiError.badReqest("ошибка валидации", errors.array()))
            }
            const {username, email, password} = req.body
            const userData = await userService.registration(username, email, password)
            return res.json(userData)
        } catch(e){
            next(e)
        }
    }
    async login(req, res, next){
        try{
            const {user, password} = req.body
            const userData = await userService.login(user, password)
            return res.json(userData)
        } catch(e){
            next(e)
        }
    }
    async logout(req, res, next){
        try{
            const refreshToken  = req.body.token
            const token = await userService.logout(refreshToken)
            return res.json(token)
        } catch(e){
            next(e)
        }
    }
    async active(req, res, next){
        try{
            const activationLinck = req.params.link
            await userService.activate(activationLinck)
            return res.redirect(process.env.CLIENT_URL)
        } catch(e){
            next(e)
        }
    }
    async refresh(req, res, next){
        try{
            const refreshToken = req.body.token
            const userData = await userService.refresh(refreshToken)
            return res.json(userData);
        } catch(e){
            next(e)
        }
    }
    async getUsers(req, res, next){
        try{
            const users = await client.query('SELECT username FROM users;')
            const usernames = users.rows
            res.json((usernames))
        } catch(e){
            next(e)
        }
    }

    async getCookie(req, res, next) {
        const cookie = req.cookies['token'];
        const authorizationHeader = req.headers.Authorization
        const acsessToken = authorizationHeader.split(' ')[2]
        console.log(req.cookies, cookie);
        return res.json({ cookies: req.cookies, cookie });
    }
}

module.exports = new UserController()