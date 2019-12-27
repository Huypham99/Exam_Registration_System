const User = require('../../models/user')

module.exports = async (email) => {
    return await User.findOne({ email: email })
}