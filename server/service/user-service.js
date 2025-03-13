const client = require("../config/db")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenServic = require("./token-servic")

class UserService{
    async registration(username, email, password) {
        const usename = await client.query('SELECT * FROM users WHERE username = $1', [username])
        if (usename.rows.length > 0){
            throw new Error (`Пользователь с именем ${username} уже существует`, usename)
        }
        const usemail = await client.query('SELECT * FROM users WHERE email = $1', [email])
        if (usemail.rows.length > 0){
            throw new Error (`Пользователь с почтой ${email} уже существует`)
        }
        const activateLink = uuid.v4()
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await client.query("INSERT INTO users (username, password, email, activationlinck, mmr) VALUES ($1, $2, $3, $4, $5) RETURNING *", [username, hashPassword, email, activateLink, 100])
        await mailService.sendActivationMail(email, activateLink)
        const createdUser  = user.rows[0];
        const plainUsers ={
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            isActivated: createdUser.isActivated
        };
        const tokens = tokenServic.generateToken(plainUsers)
        await client.query(`UPDATE users SET activationLinck  = $1 WHERE id = $2 RETURNING *`, [tokens.refreshToken, plainUsers.id])
        return{
            ...tokens,
            plainUsers
        }
    }
}

module.exports = new UserService()