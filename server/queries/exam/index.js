const getExamById = require('./rootExam')
const getAllExams = require('./getAllExams')

const Shift = require('../../models/shift')
module.exports = {
    Query: {
        getExamById,
        getAllExams
    },
    Exam: {
        shifts: exam => Shift.find({ examId: exam.id })
    }
}