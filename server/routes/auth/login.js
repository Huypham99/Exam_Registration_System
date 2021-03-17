const { Router } = require('express');
const Compare = require('../../utils/password/comparision')
const CheckExistingUser = require('../../utils/validation/existingUser')
const jwtHelper = require('../../utils/jwtHelper')
const validate = require('../../middleware/validation')
const schemas = require('../../utils/validation/schemas')

const loginRouter = Router();

loginRouter.post('/', validate(schemas.logIn), async (req, res, next) => {
    
        const { userName, password } = req.body

        let existingUser = await CheckExistingUser(userName)
        if (!existingUser) res.status(403).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' })

        let validPassword = await Compare(password, existingUser.password)
        if (!validPassword) res.status(403).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' })

        const accessTokenLife = "1m";

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";

        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'

        const accessToken = jwtHelper.generateToken(existingUser.id, accessTokenSecret, accessTokenLife)

        const refreshToken = jwtHelper.generateToken(existingUser.id, refreshTokenSecret, refreshTokenLife)

        await res.cookie('access_token', accessToken, {
            maxAge: 365 * 24 * 60 * 60 * 100,
            httpOnly: true,
        })
       
        await res.cookie('refresh_token', refreshToken, {
            maxAge: 365 * 24 * 60 * 60 * 100,
            httpOnly: true,
        })

        res.send(existingUser)

})
module.exports = loginRouter