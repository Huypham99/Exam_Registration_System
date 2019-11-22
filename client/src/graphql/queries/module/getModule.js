import gql from 'graphql-tag';

export const getAllModulesQuery = gql`
query{
  getAllModules{
    name
    moduleId
  }
}
`;