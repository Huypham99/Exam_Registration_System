import gql from 'graphql-tag';

export default gql`
  fragment userInfor on User {
    name
    dob
    studentId
  }
`;