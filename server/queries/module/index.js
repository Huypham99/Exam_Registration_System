const getModuleById = require('./rootModule')
const getAllModules = require('./getAllModules')
module.exports = {
    Query: {
        getModuleById,
        getAllModules
    }
}