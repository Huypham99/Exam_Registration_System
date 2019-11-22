const Student_Shift = require('../../models/student_shift')

module.exports = (root, { shiftHallId }) => Student_Shift.find({ shiftHallId: shiftHallId })