const Exam = `

type Exam{
  id: ID!
  name: String
  academyYear: String
  trainingSystem: String
  openDate: String
  openTime: String
  endDate: String
  endTime: String
  shifts: [Shift]
}

input createNewExamInput{
  name: String
  academyYear: String
  trainingSystem: String
  openDate: String
  openTime: String
  endDate: String
  endTime: String
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