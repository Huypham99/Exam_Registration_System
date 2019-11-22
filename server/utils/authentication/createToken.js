const jwt = require('jsonwebtoken')
const isAdmin = require('../permissions')

module.exports = async (id) => {
    
    const token = await jwt.sign({
        sub: { id: id, isAdmin: isAdmin(id) },
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET_KEY);
    return token;
}