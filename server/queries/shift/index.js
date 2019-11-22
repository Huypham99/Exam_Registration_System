const getShiftById = require('./rootShift')

const ShiftHall = require('../../models/shift_hall')
const Module = require('../../models/module')

module.exports = {
    Query: {
        getShiftById
    },
    Shift: {
        halls: shift => ShiftHall.find({ shiftId: shift.id }),
        module: shift => Module.findOne({ moduleId: shift.moduleId })
    }
}