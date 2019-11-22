const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema')
const jwt = require('jsonwebtoken')
const Cookies = require('cookies')
const parse = require('csv-parse')
const multer = require('multer')
const fs = require('fs')
const authRoutes = require('./routes/auth')

const User = require('./models/user')
const Student_Module = require('./models/student_module')
const Encrypt = require('./utils/password/encryption')
const ExistingUser = require('./utils/validation/existingUser')

require('dotenv/config')
const app = express()

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions))

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-oxtha.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true`
)
    .then(() => { app.listen(4000, () => console.log('Connected to Server')) })
    .catch(err => console.log(err))

mongoose.set('useFindAndModify', false)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
})

app.use('/verifyToken', async (req, res) => {
    try {
        let cookies = new Cookies(req, res);
        let token = await cookies.get('access_token');
        let verified = await jwt.verify(token, process.env.SECRET_KEY);
        res.send(verified)
    } catch (error) {
        res.send(error)
    }
})

const upload = multer({ dest: 'tmp/csv/' });

app.use('/upload-user-csv', upload.single('file'), (req, next, res) => {
    try {
        let results = []

        fs.createReadStream(req.file.path)
            .pipe(parse({ columns: function (e) { return e } }))
            .on('data', (row) => {
                results.push(row)
            })
            .on('end', () => {
                results.map(async data => {

                    let existUser = await ExistingUser(data['studentId'])
                    if (existUser) throw ((`Student with id: ${data['studentId']} has already existed`));

                    let encryptedPassword = await Encrypt(data['password']);

                    const user = await new User({
                        name: data['name'],
                        password: encryptedPassword,
                        email: data['email'],
                        dob: data['dob'],
                        studentId: data['studentId'],
                        program: data['program'],
                        schoolYear: data['schoolYear']
                    })
                    return user.save()
                })
                fs.unlink(`${req.file.path}`, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                })
            })
    } catch (error) {
        return next(error)
    }

})

app.use('/upload_ineligible_student_csv', upload.single('file'), (req, next, res) => {
    try {
        let results = []

        fs.createReadStream(req.file.path)
            .pipe(parse({ columns: function (e) { return e } }))
            .on('data', (row) => {
                results.push(row)
            })
            .on('close', () => {
                results.map(async data => {

                    const studentModule = await new Student_Module({
                        studentId: data['Mã số sinh viên'],
                        moduleId: data['Mã học phần'],
                        isEligible: true
                    })
                    return studentModule.save()
                })
                fs.unlink(`${req.file.path}`, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                })
            })
    } catch (error) {
        return next(error)
    }

})


app.use('/auth', authRoutes);


const server = new ApolloServer({ schema, context: ({ req, res }) => ({ ...req, ...res }) });

server.applyMiddleware({ app, cors: corsOptions });