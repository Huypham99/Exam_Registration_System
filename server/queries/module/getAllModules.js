const Module = require('../../models/module')
module.exports = (root, { id }, { user }) => {

    if (!user.isAdmin) {
        throw new Error('You are not allowed to access this resource !!')
    }

    return Module.find()
} 