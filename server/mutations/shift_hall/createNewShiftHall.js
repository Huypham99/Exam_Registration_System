const Shift_Hall = require('../../models/shift_hall')

module.exports = async (root, { input }, { user }) => {

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { shiftId, hallId } = input

    const shiftHall = await new Shift_Hall({
        shiftId,
        hallId
    })

    return shiftHall.save()

}