const Student_Shift = require('../../models/student_shift')
module.exports = async (root, { id }, { user }) => {

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    return await Student_Shift.findOneAndDelete({ shiftId: id });

}