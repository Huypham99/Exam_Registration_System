import gql from 'graphql-tag';
export const editUserMutation = gql`
  mutation ($studentId: Int, $newName: String, $newEmail: String, $newDob: String, $newStudentId: Int, $newProgram: String, $newSchoolYear: String){
      editUser(input: {studentId: $studentId, newName: $newName, newEmail: $newEmail, newDob: $newDob, newStudentId: $newStudentId, newProgram: $newProgram, newSchoolYear: $newSchoolYear}){
        studentId
    }
  }
`