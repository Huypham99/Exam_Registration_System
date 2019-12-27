const Student_Module = require('../../models/student_module')

module.exports = async (root, { input }, { user }) => {

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')
    
    const { studentId, moduleId, isEligible } = input
    
    const studentModule = await new Student_Module({
        studentId,
        moduleId,
        isEligible
    })
    
    return studentModule.save()

}