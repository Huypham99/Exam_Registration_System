const { Router } = require('express');
const Compare = require('../../utils/password/comparision')
const CheckExistingUser = require('../../utils/validation/existingUser')
const CreateToken = require('../../utils/authentication/createToken')
const validate = require('../../middleware/validation')
const schemas = require('../../utils/validation/schemas')

const loginRouter = Router();

loginRouter.post('/', validate(schemas.logIn), async (req, res, next) => {
    
        const { userName, password } = req.body

        let existingUser = await CheckExistingUser(userName)
        if (!existingUser) res.status(422).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' })

        let validPassword = await Compare(password, existingUser.password)
        if (!validPassword) res.status(422).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' })

        let token = await CreateToken(existingUser.id)

        await res.cookie('access_token', token, {
            maxAge: 365 * 24 * 60 * 60 * 100,
            httpOnly: true,
        })

        res.send(existingUser)

})
module.exports = loginRouter