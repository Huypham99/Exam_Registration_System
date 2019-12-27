const User = `

scalar Upload

type User{
    id: ID!
    name: String
    password: String
    email: String
    dob: String
    studentId: Int
    program: String
    schoolYear: String
    isAdmin: Boolean
    isEligible: Boolean
  }

  extend type Query {
    getAllUsers: [User]
    getUserById(id: String): User
    getCurrentUser: User
  }

  input CreateNewUserInput {
    name: String
    password: String
    email: String
    dob: String
    studentId: Int
    program: String
    schoolYear: String
  }
  
  input EditUserInput {
    studentId: Int
    email: String
    newName: String
    newPassword: String
    newEmail: String
    newDob: String
    newStudentId: Int
    newProgram: String
    newSchoolYear: String
  }

  input LogInInput {
    userName: String
    password: String
  }

  input deleteUserInput {
    id: String
  }

  extend type Mutation {
    logIn(input: LogInInput): User
    editUser(input: EditUserInput!): User
    createNewUser(input: CreateNewUserInput): User
    deleteUser(input: deleteUserInput): User
  }
`
module.exports = User