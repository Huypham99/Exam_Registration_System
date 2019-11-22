const { Router } = require('express');
const jwt = require('jsonwebtoken')
const Cookies = require('cookies')

const logoutRouter = Router();

logoutRouter.get('/', async (req, res) => {
    try {
        let cookies = new Cookies(req, res);
        let clearCookie = await cookies.set('access_token', { maxAge: Date.now(), httpOnly: true });
        return res.redirect('http://localhost:3000/login')
    } catch (error) {
        res.send(error)
    }
})
module.exports = logoutRouter