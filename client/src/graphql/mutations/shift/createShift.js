import gql from 'graphql-tag';

export const createShiftMutation = gql`
  mutation ($time: String, $date: String, $dayOfWeek: String, $moduleId: String, $examId: ID){
    createNewShift(input: {time: $time, date: $date, dayOfWeek: $dayOfWeek, moduleId: $moduleId, examId: $examId}){
        id
      }
  }
`