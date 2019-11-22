const Module = require('../../models/module')
module.exports = async (root, { id }) => {
    const module = await Module.findOneAndDelete({ moduleId: id });
}