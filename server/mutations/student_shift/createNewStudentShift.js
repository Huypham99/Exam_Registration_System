const Student_Shift = require('../../models/student_shift')

module.exports = async (root, { input }, { user }) => {

    if (user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { shiftHallId, studentId } = input

    const studentShift = await new Student_Shift({
        shiftHallId,
        studentId
    })

    return studentShift.save()
}