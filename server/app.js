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
const jwtHelper = require('./utils/jwtHelper')
const HallLoader = require('./loaders/hall')

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

mongoose.set('debug', true);

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
    schema, context: async ({ req, res }) => {

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret"

        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "5m"

        const cookies = Cookies(req, res)

        const accessToken = cookies.get('access_token')

        const refreshToken = cookies.get('refresh_token')

        if (!accessToken || !refreshToken) {
            return res.status(403).send({
                message: 'No token provided.',
            });
        }

        try {
            const decoded = await jwtHelper.verifyToken(accessToken, accessTokenSecret);

            const user = decoded;

            return {  hallLoader: HallLoader(), req, res, user }

        } catch (error) {

            try {

                const result = await jwtHelper.generateNewToken(
                    refreshToken,
                    refreshTokenSecret,
                    accessTokenSecret,
                    accessTokenLife
                )

                await res.cookie('access_token', result.accessToken, {
                    maxAge: 365 * 24 * 60 * 60 * 100,
                    httpOnly: true,
                })

                const user = result.user

                return {  hallLoader: HallLoader(), req, res, user }

            } catch (error) {
                res.status(403).json({
                    message: error.message,
                });
            }

        }
    }
});

server.applyMiddleware({ app, cors: corsOptions });