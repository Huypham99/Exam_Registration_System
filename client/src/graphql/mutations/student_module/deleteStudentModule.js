import gql from 'graphql-tag';
export const deleteStudentModuleMutation = gql`
  mutation ($studentId: Int ,$moduleId: String, $isEligible: Boolean){
      deleteStudentModule(input: {studentId: $studentId, moduleId: $moduleId, isEligible: $isEligible}){
        id
      }
  }
`