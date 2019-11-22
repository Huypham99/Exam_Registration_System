const User = require('../../models/user')
const isAdmin = require('../../utils/permissions')
const Cookies = require('cookies')
const jwt = require('jsonwebtoken')

module.exports = async (root, _, { req, res }) => {
    let cookies = new Cookies(req, res);
    let token = await cookies.get('access_token');
    let verified = await jwt.verify(token, process.env.SECRET_KEY);
    if(!isAdmin(verified.sub.id)){
        return res.redirect('http://localhost:3000')
    }
    return User.find({ _id: { $ne: '5dc1ade7b8bafb44dcdf4057' } })
}
