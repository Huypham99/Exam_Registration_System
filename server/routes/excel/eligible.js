const { Router } = require('express')
const fs = require('fs')
const multer = require('multer')
const parse = require('csv-parse')
const Student_Module = require('../../models/student_module')

const upload = multer({ dest: 'tmp/csv/' })

const uploadEligibleStudentsRouter = Router();

uploadEligibleStudentsRouter.post('/', upload.single('file'), (req, res, next) => {

    let results = []

    fs.createReadStream(req.file.path)
        .pipe(parse({ columns: function (e) { return e } }))
        .on('data', (row) => {
            results.push(row)
        })
        .on('end', () => {
            results.map(async data => {

                let existingStudentModule = Student_Module.findOne({ studentId: data['Mã số sinh viên'], moduleId: data['Mã học phần'], isEligible: true })

                console.log(existingStudentModule)

                // if (existingStudentModule) {
                //     res.status(422).json({ error: `Dữ liệu tải lên bị trùng` })
                // } else {
                    const studentModule = await new Student_Module({
                        studentId: data['Mã số sinh viên'],
                        moduleId: data['Mã học phần'],
                        isEligible: true
                    })

                    studentModule.save()

                    res.send(studentModule)
                
            })
            fs.unlink(`${req.file.path}`, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            })
        })


})

module.exports = uploadEligibleStudentsRouter