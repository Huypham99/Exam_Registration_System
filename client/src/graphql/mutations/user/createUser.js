import gql from 'graphql-tag';
export const createUserMutation = gql`
  mutation ($name: String, $password: String, $email: String, $dob: String, $studentId: Int, $program: String, $schoolYear: String){
      createNewUser(input: {name: $name, password: $password, email: $email, dob: $dob, studentId: $studentId, program: $program, schoolYear: $schoolYear}){
          name
          password
          email
          dob
          studentId
          program
          schoolYear
      }
  }
`