const createNewStudentShift = require('./createNewStudentShift')
const deleteStudentShift = require('./deleteStudentShift')

module.exports = {
    Mutation: {
        createNewStudentShift,
        deleteStudentShift
    }
}