const jwt = require("jsonwebtoken")
const client = require("../config/db")

class TokenService{
    generateToken(payload){
        const acsessToken = jwt.sign(payload, process.env.JWT_ACSESS_SECRET, {expiresIn: '60m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return{
            acsessToken,
            refreshToken
        }
    }

    async saveToken(username, refreshToken){
        const usetoken = await client.query('SELECT * FROM token WHERE username = $1', username)
        if (usetoken.rows.length > 0){
            usetoken.refreshToken = refreshToken
            return await client.query(`UPDATE token SET refreshToken = $1 WHERE id = $2 RETURNING *`, [usetoken, id])
        }
        const token = await client.query("INSERT INTO token (username, refreshToken) VALUES ($1, $2)", [username, refreshToken])
    }
}

module.exports = new TokenService()