const createNewModule = require('./createNewModule')
const deleteModule = require('./deleteModule')
const editModule = require('./editModule')
module.exports = {
    Mutation: {
        createNewModule,
        deleteModule,
        editModule
    }
}