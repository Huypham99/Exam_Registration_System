import gql from 'graphql-tag';

export default gql`
  fragment moduleInfor on Module {
    id
    name
    moduleId
  }
`;