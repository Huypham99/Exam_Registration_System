const Exam = require('../../models/exam')
module.exports = (root, { id }) => Exam.findById(id)