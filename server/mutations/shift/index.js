const createNewShift = require('./createNewShift')
const deleteShift = require('./deleteShift')
module.exports = {
    Mutation: {
        createNewShift,
        deleteShift
    }
}
