const Student_Module = require('../../models/student_module')
module.exports = async (root, { input }) => {
    const { studentId, moduleId, isEligible } = input
    const student_module = await Student_Module.findOneAndDelete({ studentId: studentId, moduleId: moduleId, isEligible: isEligible });
}