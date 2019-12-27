const createNewShiftHall = require('./createNewShiftHall')
const deleteShiftHallByShiftId = require('./deleteShiftHall')

module.exports = {
    Mutation: {
        createNewShiftHall,
        deleteShiftHallByShiftId
    }
}