const Hall = require('../../models/hall')
module.exports = async (root, { id }) => {
    const hall = await Hall.findByIdAndDelete(id);
}