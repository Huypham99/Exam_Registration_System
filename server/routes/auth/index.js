const { Router } = require('express');
const logoutRoutes = require('./logout');
const loginRoutes = require('./login');

const authRouter = Router();

authRouter.use('/logout', logoutRoutes);
authRouter.use('/login', loginRoutes);

module.exports = authRouter;