const { Router } = require('express');
const logoutRoutes = require('./logout');

const authRouter = Router();

authRouter.use('/logout', logoutRoutes);

module.exports = authRouter;