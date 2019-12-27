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
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const excelRoutes = require('./routes/excel')
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
app.use(bodyParser.json());

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-oxtha.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true`
)
    .then(() => { app.listen(4000, () => console.log('Connected to Server')) })
    .catch(err => console.log(err))

mongoose.set('useFindAndModify', false)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
})

app.use('/auth', authRoutes);
app.use('/excel', excelRoutes);

app.use((error, req, res, next) => {
    res.status(error.status)
    res.json({
        error: {
            message: error.message
        }
    })
})

const server = new ApolloServer({
    schema, context: ({ req, res }) => {

        const now = Date.now().valueOf() / 1000

        const cookies = Cookies(req, res)

        const token = cookies.get('access_token')
        
        if(!token) throw new Error('Please login !!')

        let decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
            throw new Error(`token expired: ${JSON.stringify(decoded)}`)
        }
        if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
            throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
        }

        let user = decoded.sub;

        return { req, res, user }
    }
});

server.applyMiddleware({ app, cors: corsOptions });