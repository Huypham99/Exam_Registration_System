const Student_Shift = require('../../models/student_shift')

module.exports = (root, { studentId }) => Student_Shift.find({ studentId: studentId })