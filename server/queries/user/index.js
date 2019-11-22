const getUserById = require('./rootUser')
const getAllUsers = require('./getAllUsers')
const getCurrentUser = require('./getCurrentUser')
const isAdmin = require('../../utils/permissions')

module.exports = {
    Query: {
        getUserById,
        getAllUsers,
        getCurrentUser,
    },
    User: {
        isAdmin: ({ id }) => isAdmin(id)
    }
}