const Hall = require('../../models/hall')

module.exports = async (root, { input }) => {
    const { name, capacity } = input
    const hall = await new Hall({
        name,
        capacity
    })
    return hall.save()
}