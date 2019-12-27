const Student_Shift = require('../../models/student_shift')
module.exports = async (root, { input }) => {

    const { studentId, shiftHallId } = input

    return await Student_Shift.findOneAndDelete({ studentId: studentId, shiftHallId: shiftHallId });

}