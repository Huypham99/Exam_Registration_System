const { Router } = require('express')
const fs = require('fs')
const multer = require('multer')
const parse = require('csv-parse')
const Encrypt = require('../../utils/password/encryption')
const ExistingUser = require('../../utils/validation/existingUser')
const User = require('../../models/user')

const upload = multer({ dest: 'tmp/csv/' })

const uploadStudentsRouter = Router();

uploadStudentsRouter.post('/', upload.single('file'), (req, res, next) => {

    let results = []

    fs.createReadStream(req.file.path)
        .pipe(parse({ columns: function (e) { return e } }))
        .on('data', (row) => {
            if(!row){
                res.status(422).json({ error: `Dữ liệu không hợp lệ` })
            }
            results.push(row)
        })
        .on('end', () => {

            if(results.length == 0)

            results.map(async data => {

                let existUser = await ExistingUser(data['Mã sinh viên/Tên đăng nhập'])

                if (existUser) {
                    res.status(422).json({ error: `Sinh viên với mã số: ${data['Mã sinh viên/Tên đăng nhập']} đã tồn tại` })
                } else {

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
                }

            })
            fs.unlink(`${req.file.path}`, function () {
                console.log('file deleted successfully');
            })
        })

})

module.exports = uploadStudentsRouter