const User = require('../../models/user')
module.exports = (root, { id }) => User.findById(id)