const Shift = require('../../models/shift')
module.exports = (root, { id }) => Shift.findById(id)