const Hall = require('../../models/hall')
module.exports = (root, { id }) => Hall.findById(id)