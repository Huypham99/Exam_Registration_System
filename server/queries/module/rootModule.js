const Module = require('../../models/module')
module.exports = (root, { id }) => Module.findById(id)