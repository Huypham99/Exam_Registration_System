const Student_Module = require('../../models/student_module')

module.exports = (root, { studentId }) => Student_Module.find({ studentId: studentId, isEligible: false })