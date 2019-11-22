import gql from 'graphql-tag';
export const createModuleMutation = gql`
  mutation ($moduleId: String, $name: String){
    createNewModule(input: {moduleId: $moduleId, name: $name}){
        moduleId
        name
      }
  }
`