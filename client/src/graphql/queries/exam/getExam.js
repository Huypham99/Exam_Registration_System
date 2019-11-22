import gql from 'graphql-tag';
import examInforFragment from '../../fragments/exam/examInfor'
import shiftInforFragment from '../../fragments/shift/shiftInfor'

export const getExamByIdQuery = gql`
query ($id: String){
    getExamById(id: $id){
      ...examInfor
      shifts{
        ...shiftInfor
        module{
          id
          name
          moduleId
        }
        halls{
           hallDetail{
            name
            capacity
          }
        }
      }
    }
  }
  ${examInforFragment}
  ${shiftInforFragment}
`;


export const getAllExamsQuery = gql`
query{
    getAllExams{
      ...examInfor
  }
}
${examInforFragment}
`;
