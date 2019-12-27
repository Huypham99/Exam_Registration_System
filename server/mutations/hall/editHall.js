const Hall = require('../../models/hall')
const { editHallInputValidation } = require('../../utils/validation/hall')

module.exports = async (root, { input }, { user }) => {

    await editHallInputValidation(input)
    
    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { name, newName, newCapacity } = input

    let formatedName = newName.toUpperCase()
    let formatedCapcity = parseInt(newCapacity)

    if (name !== formatedName) {
        const existHall = await Hall.findOne({ name: formatedName })
        if (existHall) { throw new Error('Đã tồn tại giảng đường này !!') }
    }

    const hall = await Hall.findOneAndUpdate({ name: name }, { name: formatedName, capacity: formatedCapcity }, { new: true });

    return hall;

}