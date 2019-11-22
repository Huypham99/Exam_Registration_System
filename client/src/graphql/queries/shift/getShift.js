import gql from 'graphql-tag';

export const getShiftByIdQuery = gql`
query ($id: String){
  getShiftById(id: $id){
    module{
      id
    }
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