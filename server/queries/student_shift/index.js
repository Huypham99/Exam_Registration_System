const getStudentShiftByShiftHallId = require('./getByShiftHallId')
const getStudentShiftByStudentId = require('./getByStudentId')
const Shift_Hall = require('../../models/shift_hall')
const User = require('../../models/user')

module.exports = {
    Query: {
        getStudentShiftByShiftHallId,
        getStudentShiftByStudentId
    },
    Student_Shift: {
        shiftHall: root => Shift_Hall.findById(root.shiftHallId),
        student: root => User.findById(root.studentId)
    }
}