import gql from 'graphql-tag';
export const createHallMutation = gql`
  mutation ($name: String, $capacity: Int){
      createNewHall(input: {name: $name, capacity: $capacity}){
          name
          capacity
      }
  }
`