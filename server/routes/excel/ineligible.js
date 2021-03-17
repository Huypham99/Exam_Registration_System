const { Router } = require('express')
const fs = require('fs')
const multer = require('multer')
const parse = require('csv-parse')
const Student_Module = require('../../models/student_module')

const upload = multer({ dest: 'tmp/csv/' })

const uploadIneligibleStudentsRouter = Router();

uploadIneligibleStudentsRouter.post('/', upload.single('file'), (req, res, next) => {

    try {

        let results = []

        fs.createReadStream(req.file.path)
            .pipe(parse({ columns: function (e) { return e } }))
            .on('data', (row) => {
                results.push(row)
            })
            .on('end', async () => {
                await results.map(async data => {

                    // let existingStudentModule = Student_Module.findOne({ studentId: data['Mã số sinh viên'], moduleId: data['Mã học phần'], isEligible: false })

                    // if (existingStudentModule) {
                    //     res.status(422).json({ error: `Dữ liệu tải lên bị trùng` })
                    // } else {

                        const studentModule = await new Student_Module({
                            studentId: data['Mã số sinh viên'],
                            moduleId: data['Mã học phần'],
                            isEligible: false
                        })

                        studentModule.save()
                })

                res.send('Tải lên thành công')

                fs.unlink(`${req.file.path}`, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                })
            })
    } catch (error) {
        return next(error)
    }

})

module.exports = uploadIneligibleStudentsRouter