const Shift_Hall = require('../../models/shift_hall')

module.exports = async (root, { input }) => {
    const { shiftId, hallId } = input
    const shiftHall = await new Shift_Hall({
        shiftId,
        hallId
    })
    return shiftHall.save()
}