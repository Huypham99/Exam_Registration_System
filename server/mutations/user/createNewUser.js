const User = require('../../models/user')
const Encrypt = require('../../utils/password/encryption')
const ExistingUser = require('../../utils/validation/existingUser')
const FormatDate = require('../../utils/inputFormat/date')
const { createUserInputValidation } = require('../../utils/validation/user')

module.exports = async (root, { input }, { user }) => {

    await createUserInputValidation(input)

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    let { name, password, email, dob, studentId, program, schoolYear } = input;

    let existUser = await ExistingUser(studentId)
    if (existUser) throw new Error('Sinh viên đã tồn tại !!')

    let formatedDob = FormatDate(dob)

    encryptPassword = await Encrypt(password);

    const newUser = await new User({
        name: name,
        password: encryptPassword,
        email: email,
        dob: formatedDob,
        studentId: studentId,
        program: program,
        schoolYear: schoolYear
    })
    return newUser.save()
}