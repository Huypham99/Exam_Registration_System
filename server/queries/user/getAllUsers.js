const User = require('../../models/user')

module.exports = async (root, _, { user }) => {

    if (!user.isAdmin) {
        throw new Error('You are not allowed to do access this resource !!')
    }

    return User.find({ _id: { $ne: '5dc1ade7b8bafb44dcdf4057' } })
}
