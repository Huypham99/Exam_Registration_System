const createNewUser = require('./createNewUser')
const logIn = require('./logIn')
const deleteUser = require('./deleteUser')
const editUser = require('./editUser')

module.exports = {
    Mutation: {
        createNewUser,
        logIn,
        deleteUser,
        editUser
    }
}
