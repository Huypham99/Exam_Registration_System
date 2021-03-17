const User = require('../../models/user')
module.exports = async (root, { input }, { user }) => {

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { id } = input;

    if (id) {
        return await User.findOneAndDelete({ studentId: id });
    } else {
        throw new Error('Input invalid')
    }

}