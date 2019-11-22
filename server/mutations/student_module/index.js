const createNewStudentModule = require('./createNewStudentModule')
const deleteStudentModule = require('./deleteStudentModule')

module.exports = {
    Mutation: {
        createNewStudentModule,
        deleteStudentModule
    }
}