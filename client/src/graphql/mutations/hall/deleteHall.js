import gql from 'graphql-tag';
export const deleteHallMutation = gql`
  mutation ($id: String){
      deleteHall(id: $id){
        id
      }
  }
`