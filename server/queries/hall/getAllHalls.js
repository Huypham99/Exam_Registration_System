const Hall = require('../../models/hall')
module.exports = (root, _, { user }) => {

    if (!user.isAdmin) {
        throw new Error('You are not allowed to do access this resource !!')
    }

    return Hall.find()
}