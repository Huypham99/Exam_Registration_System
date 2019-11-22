import gql from 'graphql-tag';
export const deleteUserMutation = gql`
  mutation ($id: String){
      deleteUser(input: { id: $id }){
          id
      }
  }
`