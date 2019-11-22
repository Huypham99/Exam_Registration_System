import gql from 'graphql-tag';
export const logInMutation = gql`
  mutation ($userName: String, $password: String){
      logIn(input: { userName: $userName, password: $password }){
          name
          schoolYear
      }
  }
`