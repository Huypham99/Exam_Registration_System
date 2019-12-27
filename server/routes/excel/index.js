const { Router } = require('express');
const uploadStudentsRouter = require('./students');
const uploadIneligibleStudentsRouter = require('./ineligible')
const uploadEligibleStudentsRouter = require('./eligible')

const excelRouter = Router();

excelRouter.use('/students', uploadStudentsRouter);
excelRouter.use('/ineligible-students', uploadIneligibleStudentsRouter);
excelRouter.use('/eligible-students', uploadEligibleStudentsRouter);

module.exports = excelRouter;