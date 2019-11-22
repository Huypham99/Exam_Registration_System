const getHasHallById = require('./rootShiftHall')
const Hall = require('../../models/hall')
const Shift = require('../../models/shift')
module.exports = {
    Query: {
        getHasHallById
    },
    Shift_Hall: {
        hallDetail: shift_hall => Hall.findById(shift_hall.hallId),
        shiftDetail: shift_hall => Shift.findById(shift_hall.shiftId)
    }
}