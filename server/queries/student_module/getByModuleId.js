const Student_Module = require('../../models/student_module')

module.exports = (root, { moduleId }) => Student_Module.find({ moduleId: moduleId })