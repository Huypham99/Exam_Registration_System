const Shift = `

type Shift {
    id: ID! 
    time: String
    date: String
    dayOfWeek: String
    examId: ID
    moduleId: String
    module: Module
    halls: [Shift_Hall]
 }

 input createNewShiftInput {
    time: String
    date: String
    dayOfWeek: String
    examId: ID
    moduleId: String
 }
 extend type Query {
    getShiftById(id: String): Shift
 }
 extend type Mutation {
    createNewShift(input: createNewShiftInput): Shift
 }
`
module.exports = Shift