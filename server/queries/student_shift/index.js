const getStudentShiftByShiftHallId = require('./getByShiftHallId')
const getStudentShiftByStudentId = require('./getByStudentId')
const Shift_Hall = require('../../models/shift_hall')
module.exports = {
    Query: {
        getStudentShiftByShiftHallId,
        getStudentShiftByStudentId
    },
    Student_Shift: {
        shiftHalls: root => Shift_Hall.findById(root.shiftHallId)
    }
}