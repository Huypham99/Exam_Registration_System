import gql from 'graphql-tag';

export const getAllHalls = gql`
query{
  getAllHalls{
    id
    name
    capacity
  }
}
`;