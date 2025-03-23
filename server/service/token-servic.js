const jwt = require("jsonwebtoken")
const client = require("../config/db")

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '60m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    }

    validetaAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }catch(e){
            return null
        }
    }
    validetaRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }catch(e){
            return null
        }
    }

    async saveToken(username, refreshToken){
        const usetoken = await client.query('SELECT * FROM token WHERE username = $1', [username])
        if (usetoken.rows.length > 0){
            usetoken.refreshToken = refreshToken
            return await client.query(`UPDATE token SET refreshToken = $1 WHERE username = $2 RETURNING *`, [usetoken.refreshToken, username])
        }
        const token = await client.query("INSERT INTO token (username, refreshToken) VALUES ($1, $2)", [username, refreshToken])
    }

    async removeToken(refreshToken){
        const token = await client.query('DELETE FROM token WHERE refreshtoken = $1;',[refreshToken])
        return token
    }

    async findToken(token){
        const tokenData = await client.query('SELECT * FROM token WHERE refreshtoken = $1', [token])
        return tokenData
    }
}

module.exports = new TokenService()