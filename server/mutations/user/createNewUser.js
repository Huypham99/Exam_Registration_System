const User = require('../../models/user')
const Encrypt = require('../../utils/password/encryption')
const ExistingUser = require('../../utils/validation/existingUser')
module.exports = async (root, { input }) => {

    let { name, password, email, dob, studentId, program, schoolYear } = input;

    let existUser = await ExistingUser(studentId)
    if (existUser) throw new Error('Sinh viên đã tồn tại !!')

    encryptPassword = await Encrypt(password);

    const user = await new User({
        name: name,
        password: encryptPassword,
        email: email,
        dob: dob,
        studentId: studentId,
        program: program,
        schoolYear: schoolYear
    })
    return user.save()
}