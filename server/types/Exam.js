const Exam = `

type Exam{
   id: ID!
   name: String
   academyYear: String
   trainingSystem: String
   shifts: [Shift]
}

input createNewExamInput{
  name: String
  academyYear: String
  trainingSystem: String
}

extend type Query {
  getExamById(id: String): Exam
  getAllExams: [Exam]
}

extend type Mutation {
  createNewExam(input: createNewExamInput): Exam
}
`
module.exports = Exam;