const createNewHall = require('./createNewHall')
const deleteHall = require('./deleteHall')

module.exports = {
    Mutation: {
        deleteHall,
        createNewHall
    }
}