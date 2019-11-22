const Student_Shift = require('../../models/student_shift')

module.exports = async (root, { input }) => {
    const { shiftHallId, studentId} = input
    const studentShift = await new Student_Shift({
        shiftHallId,
        studentId
    })
    return studentShift.save()
}