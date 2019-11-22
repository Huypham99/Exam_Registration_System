const User = require('../../models/user')
module.exports = async (root, { input }) => {
    const { id } = input;
    const user = await User.findOneAndDelete({ studentId: id });
}