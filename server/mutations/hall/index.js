const createNewHall = require('./createNewHall')
const deleteHall = require('./deleteHall')
const editHall = require('./editHall')

module.exports = {
    Mutation: {
        deleteHall,
        createNewHall,
        editHall
    }
}