import gql from 'graphql-tag';

export const getShiftByIdQuery = gql`
query ($id: String){
  getShiftById(id: $id){
    halls{
      id
      hallDetail{
        id
        name
        capacity
      }
    }
  }
}
`;