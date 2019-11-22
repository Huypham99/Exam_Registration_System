import gql from 'graphql-tag';

export const createShiftHallMutation = gql`
  mutation ($shiftId: ID, $hallId: ID){
    createNewShiftHall(input: {shiftId: $shiftId, hallId: $hallId}){
        id
      }
  }
`