const User = require('../../models/user')
const ExistingUser = require('../../utils/validation/existingUser')
const ExistingEmail = require('../../utils/validation/existingEmail')
const FormatDate = require('../../utils/inputFormat/date')
const { editUserInputValidation } = require('../../utils/validation/user')

module.exports = async (root, { input }, { user }) => {

    await editUserInputValidation(input)

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const {
        studentId,
        email,
        newName,
        newEmail,
        newDob,
        newStudentId,
        newProgram,
        newSchoolYear
    } = input

    let formatedDob = FormatDate(newDob)

    if (studentId !== newStudentId || email !== newEmail) {
        let existUser = await ExistingUser(newStudentId)
        let existEmail = await ExistingEmail(newEmail)
        if (existUser || existEmail) throw new Error('Sinh viên này đã tồn tại !!')
    }

    return User.findOneAndUpdate({ studentId: studentId }, { name: newName, email: newEmail, dob: formatedDob, studentId: newStudentId, program: newProgram, schoolYear: newSchoolYear }, { new: true });

}