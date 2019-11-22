const getHallById = require('./rootHall')
const getAllHalls = require('./getAllHalls')
module.exports = {
    Query: {
        getHallById,
        getAllHalls
    }
}