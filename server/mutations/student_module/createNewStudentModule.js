const Student_Module = require('../../models/student_module')

module.exports = async (root, { input }) => {
    const { studentId, moduleId, isEligible } = input
    const studentModule = await new Student_Module({
        studentId,
        moduleId,
        isEligible
    })
    return studentModule.save()
}