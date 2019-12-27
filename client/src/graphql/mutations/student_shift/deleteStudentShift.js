import gql from 'graphql-tag';

export const deleteStudentShiftMutation = gql`
  mutation ($shiftHallId: String, $studentId: String){
    deleteStudentShift(input: {shiftHallId: $shiftHallId, studentId: $studentId}){
        shiftHallId
      }
  }
`