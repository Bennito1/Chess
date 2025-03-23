const client = require("../config/db")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenServic = require("./token-servic")
const apiError = require("../esecptions/api-error")
const ApiError = require("../esecptions/api-error")

class UserService{
    async registration(username, email, password) {
        const usename = await client.query('SELECT * FROM users WHERE username = $1', [username])
        if (usename.rows.length > 0){
            throw apiError.badReqest(`Пользователь с именем ${username} уже существует`)
        }
        const usemail = await client.query('SELECT * FROM users WHERE email = $1', [email])
        if (usemail.rows.length > 0){
            throw apiError.badReqest(`Пользователь с почтой ${email} уже существует`)
        }
        console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USER, process.env.SMTP_PASSWORD)
        const activateLink = uuid.v4()
        const hashPassword = await bcrypt.hash(password, 3)
        const newuser = await client.query("INSERT INTO users (username, password, email, activationlinck, mmr) VALUES ($1, $2, $3, $4, $5) RETURNING *", [username, hashPassword, email, activateLink, 100])
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activateLink}`, username)
        const createdUser  = newuser.rows[0]
        const user ={
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            isActivated: createdUser.isactivated,
            mmr: createdUser.mmr
        }
        const tokens = tokenServic.generateToken(plainUsers)
        await tokenServic.saveToken(user.username, tokens.refreshToken)
        return{
            ...tokens,
            user
        }
    }

    async activate(activationLinck){
        const user = await client.query('SELECT * FROM users WHERE activationLinck = $1', [activationLinck])
        if (user.rows.length <= 0){
            throw apiError.badReqest("Некоректная ссылка авторизации")
        }
        const createdUser  = user.rows[0]
        await client.query(`UPDATE users SET isActivated  = $1 WHERE id = $2 RETURNING *`, [true, createdUser.id])
    }

    async login(userData, password){
        const usename = await client.query('SELECT * FROM users WHERE username = $1', [userData])
        if (usename.rows.length <= 0){
            const usemail = await client.query('SELECT * FROM users WHERE email = $1', [userData])
            if (usemail.rows.length <=0){
                throw ApiError.badReqest("Неверный пароль или имя пользователя")
            }
            const createdUser  = usemail.rows[0]
            const isPassword = await bcrypt.compare(password, createdUser.password)
            if(!isPassword){
                throw ApiError.badReqest("Неверный пароль или имя пользователя")
            }
            const user ={
                id: createdUser.id,
                username: createdUser.username,
                email: createdUser.email,
                isActivated: createdUser.isactivated,
                mmr: createdUser.mmr
            }
            const tokens = tokenServic.generateToken(user)
            await tokenServic.saveToken(user.username, tokens.refreshToken)
            return{
                ...tokens,
                user
            }
        }
        const createdUser  = usename.rows[0]
        const isPassword = await bcrypt.compare(password, createdUser.password)
        if(!isPassword){
            throw ApiError.badReqest("Неверный пароль или имя пользователя")
        }
        const user ={
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            isactivated: createdUser.isactivated,
            mmr: createdUser.mmr
        }
        const tokens = tokenServic.generateToken(user)
        await tokenServic.saveToken(user.username, tokens.refreshToken)
        return{
            ...tokens,
            user
        }
    }

    async logout(refreshToken){
        const token = await tokenServic.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.unauthorizedError()
        }
        const userData = tokenServic.validetaRefreshToken(refreshToken)
        const tokenData = await tokenServic.findToken(refreshToken)
        if(tokenData.rows.length <= 0 || !userData){
            throw ApiError.unauthorizedError()
        }
        const tokenUser = tokenData.rows[0]

        const refreshUser = await client.query('SELECT * FROM users WHERE username = $1', [tokenUser.username])
        const createdUser  = refreshUser.rows[0]
        const user ={
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            isActivated: createdUser.isactivated,
            mmr: createdUser.mmr
        }
        const tokens = tokenServic.generateToken(user)
        await tokenServic.saveToken(user.username, tokens.refreshToken)
        return {
            ...tokens,
            user
        }
    }

}

module.exports = new UserService()