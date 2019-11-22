const Student_Module = require('../../models/student_module')

module.exports = (root) => Student_Module.find({ isEligible: false })