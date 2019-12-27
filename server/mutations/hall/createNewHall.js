const Hall = require('../../models/hall')
const { createHallInputValidation } = require('../../utils/validation/hall')

module.exports = async (root, { input }, { user }) => {

    await createHallInputValidation(input)

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { name, capacity } = input

    let formatedName = name.toUpperCase()
    let formatedCapcity = parseInt(capacity)

    const hall = await new Hall({
        name: formatedName,
        capacity: formatedCapcity
    })

    return hall.save()
}