const User = require('../../models/user')
const Cookies = require('cookies')
const jwt = require('jsonwebtoken')

module.exports = async (root, _, { req, res }) => {

    let cookies = new Cookies(req, res);
    let token = await cookies.get('access_token');
    let currentUser = await jwt.verify(token, process.env.SECRET_KEY);
    if (!currentUser) { throw new Error('Please login !!') }
    return User.findById(currentUser.sub.id)
}