const createNewUser = require('./createNewUser')
const deleteUser = require('./deleteUser')
const editUser = require('./editUser')

module.exports = {
    Mutation: {
        createNewUser,
        deleteUser,
        editUser
    }
}
