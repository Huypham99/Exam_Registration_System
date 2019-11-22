const Student_Shift = require('../../models/student_shift')
module.exports = async (root, { input }) => {
    const { studentId, shiftHallId } = input
    const student_shift = await Student_Shift.findOneAndDelete({ studentId: studentId, shiftHallId: shiftHallId });
}