import gql from 'graphql-tag';
export const editModuleMutation = gql`
  mutation ($moduleId: String, $newModuleId: String, $newName: String){
      editModule(input: {moduleId: $moduleId, newModuleId: $newModuleId, newName: $newName}){
        moduleId
    }
  }
`