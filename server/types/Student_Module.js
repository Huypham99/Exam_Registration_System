const Student_Module = `

type Student_Module {
    id: ID!
    studentId: String
    moduleId: String
    isEligible: Boolean
    studentInfor: User
    moduleInfor: Module
 }

 input createNewStudentModuleInput {
    studentId: String
    moduleId: String
    isEligible: Boolean
 }

 input deleteStudentModuleInput {
   studentId: Int
   moduleId: String
   isEligible: Boolean
 }
 extend type Query {
    getIneligibleByStudentId(studentId: Int): [Student_Module]
    getEligibleByStudentId(studentId: Int): [Student_Module]
    getStudentModuleByModuleId(moduleId: String): [Student_Module]
    getEligibleStudents: [Student_Module]
    getIneligibleStudents: [Student_Module]
 }
 extend type Mutation {
    createNewStudentModule(input: createNewStudentModuleInput): Student_Module
    deleteStudentModule(input: deleteStudentModuleInput): Student_Module
 }
`
module.exports = Student_Module