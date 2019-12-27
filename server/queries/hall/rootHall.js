const Hall = require('../../models/hall')
module.exports = (root, { id }, { user }) => {
    
    if (!user.isAdmin) {
        throw new Error('You are not allowed to do access this resource !!')
    }

    return Hall.findById(id)
}