import gql from 'graphql-tag';
export const editHallMutation = gql`
  mutation ($name: String, $newName: String, $newCapacity: Int){
      editHall(input: {name: $name, newName: $newName, newCapacity: $newCapacity}){
        name
    }
  }
`