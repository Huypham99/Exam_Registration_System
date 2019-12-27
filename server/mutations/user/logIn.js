const User = require('../../models/user')
const Compare = require('../../utils/password/comparision')
const CheckExistingUser = require('../../utils/validation/existingUser')
const CreateToken = require('../../utils/authentication/createToken')

module.exports = async (root, { input }, { res, next }) => {

    try {
        
        const { userName, password } = input

        let existingUser = await CheckExistingUser(userName)
        if (!existingUser) throw new Error('Wrong email or password')

        let validPassword = await Compare(password, existingUser.password)
        if (!validPassword) throw new Error('Wrong email or password')

        let token = await CreateToken(existingUser.id)

        await res.cookie('access_token', token, {
            maxAge: 365 * 24 * 60 * 60 * 100,
            httpOnly: true,
        })

    } catch (error) {
        return next(error)
    }

    return existingUser
}