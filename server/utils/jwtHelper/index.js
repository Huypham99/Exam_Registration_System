const jwt = require('jsonwebtoken');
const isAdmin = require('../permissions')

const generateToken = (userId, secretKey, lifeTime) => {
    return jwt.sign({ id: userId, isAdmin: isAdmin(userId) }, secretKey, { expiresIn: lifeTime });
}

const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey);
}

const generateNewToken = async (refreshToken, refreshTokenSecret, accessTokenSecret, accessTokenLife) => {

    const decoded = await verifyToken(refreshToken, refreshTokenSecret);

    const user = decoded;

    const accessToken = await generateToken(user, accessTokenSecret, accessTokenLife);

    return {accessToken, user};

}

module.exports = {
    generateToken: generateToken,
    generateNewToken: generateNewToken,
    verifyToken: verifyToken
}