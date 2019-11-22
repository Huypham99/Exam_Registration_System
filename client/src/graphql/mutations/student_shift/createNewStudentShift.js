import gql from 'graphql-tag';

export const createStudentShiftMutation = gql`
  mutation ($shiftHallId: String, $studentId: String){
    createNewStudentShift(input: {shiftHallId: $shiftHallId, studentId: $studentId}){
        shiftHallId
        studentId
      }
  }
`