const Shift_Hall = require('../../models/shift_hall')
module.exports = (root, { id }) => Shift_Hall.findById(id)