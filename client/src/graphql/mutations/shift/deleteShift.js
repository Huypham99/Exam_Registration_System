import gql from 'graphql-tag';
export const deleteShiftMutation = gql`
  mutation ($id: String){
      deleteShift(id: $id){
        id
      }
  }
`