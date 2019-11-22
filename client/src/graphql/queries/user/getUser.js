import gql from 'graphql-tag';

export const getUserByIdQuery = gql`
query ($id: String){
    getUserById(id: $id){
        name
        email
        dob
        studentId
        program
        schoolYear
    }
  }
`;

export const getCurrentUserQuery = gql`
query{
    getCurrentUser{
        id
        name
        email
        dob
        studentId
        program
        schoolYear
        isAdmin
    }
  }
`;

export const getAllUsers = gql`
query{
    getAllUsers{
        id
        name
        email
        dob
        studentId
        program
        schoolYear
    }
  }
`;