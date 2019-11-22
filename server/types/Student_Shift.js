const Student_Shift = `

type Student_Shift {
    id: ID!
    studentId: String
    shiftHallId: String
    shiftHalls: Shift_Hall
 }

 input createNewStudentShiftInput {
    shiftHallId: String
    studentId: String
 }

 input deleteStudentShiftInput {
   shiftHallId: String
   studentId: String
}

 extend type Query {
    getStudentShiftByStudentId(studentId: String): [Student_Shift]
    getStudentShiftByShiftHallId(shiftHallId: String): [Student_Shift]
 }
 extend type Mutation {
    createNewStudentShift(input: createNewStudentShiftInput): Student_Shift
    deleteStudentShift(input: deleteStudentShiftInput): Student_Shift
 }
`
module.exports = Student_Shift