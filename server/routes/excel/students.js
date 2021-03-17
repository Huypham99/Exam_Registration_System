const { Router } = require('express')
const fs = require('fs')
const multer = require('multer')
const parse = require('csv-parse')
const Encrypt = require('../../utils/password/encryption')
const ExistingUser = require('../../utils/validation/existingUser')
const User = require('../../models/user')
const { createUserInputValidation } = require('../../utils/validation/user')

const upload = multer({ dest: 'tmp/csv/' })

const uploadStudentsRouter = Router();

uploadStudentsRouter.post('/', upload.single('file'), (req, res, next) => {

    let results = []

    fs.createReadStream(req.file.path)
        .pipe(parse({ columns: function (e) { return e } }))
        .on('data', (row) => {
            if (!row) {
                res.status(422).json({ error: `Dữ liệu không hợp lệ` })
            }
            results.push(row)
        })
        .on('end', () => {

            results.map(async data => {

                await createUserInputValidation({
                    name: data['Họ và tên'],
                    password: data['Mật khẩu'],
                    email: data['VNU email'],
                    dob: data['Ngày sinh'],
                    studentId: data['Mã sinh viên/Tên đăng nhập'],
                    program: data['Chương trình đào tạo'],
                    schoolYear: data['Khóa đào tạo']
                })

                let encryptedPassword = await Encrypt(data['Mật khẩu']);

                const user = await new User({
                    name: data['Họ và tên'],
                    password: encryptedPassword,
                    email: data['VNU email'],
                    dob: data['Ngày sinh'],
                    studentId: data['Mã sinh viên/Tên đăng nhập'],
                    program: data['Chương trình đào tạo'],
                    schoolYear: data['Khóa đào tạo']
                })

                user.save()

                res.send(user)
            })

            // })
            fs.unlink(`${req.file.path}`, function () {
                console.log('file deleted successfully');
            })
        })

})

module.exports = uploadStudentsRouter