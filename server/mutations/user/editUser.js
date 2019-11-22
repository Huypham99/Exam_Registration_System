const User = require('../../models/user')
const ExistingUser = require('../../utils/validation/existingUser')

module.exports = async (root, { input }) => {
    const {
        studentId,
        newName,
        newEmail,
        newDob,
        newStudentId,
        newProgram,
        newSchoolYear
    } = input

    let existUser = await ExistingUser(newStudentId)
    if (existUser) throw new Error('Sinh viên này đã tồn tại !!')

    const user = await User.findOneAndUpdate({ studentId: studentId }, { name: newName, email: newEmail, dob: newDob, studentId: newStudentId, program: newProgram, schoolYear: newSchoolYear }, { new: true });

}