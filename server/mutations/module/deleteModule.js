const Module = require('../../models/module')
module.exports = async (root, { id }, { user }) => {
    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')
    return await Module.findOneAndDelete({ moduleId: id });
}