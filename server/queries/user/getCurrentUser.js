const User = require('../../models/user')
const Cookies = require('cookies')
const jwt = require('jsonwebtoken')

module.exports = async (root, _, {req, res, user}) => {
    return User.findById(user.id)
}