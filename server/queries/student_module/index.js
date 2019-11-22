const getIneligibleByStudentId = require('./getIneligibleByStudentId')
const getStudentModuleByModuleId = require('./getByModuleId')
const getEligibleStudents = require('./getEligibleStudents')
const getIneligibleStudents = require('./getIneligibleStudents')
const User = require('../../models/user')
const Module = require('../../models/module')
module.exports = {
    Query: {
        getIneligibleByStudentId,
        getStudentModuleByModuleId,
        getEligibleStudents,
        getIneligibleStudents
    },
    Student_Module: {
        studentInfor: student_module => User.findOne({ studentId: student_module.studentId }),
        moduleInfor: student_module => Module.findOne({ moduleId: student_module.moduleId })
    }
}