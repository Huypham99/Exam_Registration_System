const User = require('../../models/user')

module.exports = async (studentId) => {
    return await User.findOne({ studentId: studentId })
}