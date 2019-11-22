import gql from 'graphql-tag';
export const deleteModuleMutation = gql`
  mutation ($id: String){
      deleteModule(id: $id){
        id
      }
  }
`