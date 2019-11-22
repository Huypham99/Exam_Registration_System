import gql from 'graphql-tag';
import moduleInforFragment from '../../fragments/module/moduleInfor'
import shiftInforFragment from '../../fragments/shift/shiftInfor'

export const getStudentShiftByStudentIdQuery = gql`
query($studentId: String){
  getStudentShiftByStudentId(studentId: $studentId){
    shiftHalls{
      shiftDetail{
        ...shiftInfor
        module{
          ...moduleInfor
        }
      }
      hallDetail{
        id
        name
      }
    }
	}
}
${moduleInforFragment}
${shiftInforFragment}
`

export const getStudentShiftByShiftHallIdQuery = gql`
query($shiftHallId: String){
  getStudentShiftByShiftHallId(shiftHallId: $shiftHallId){
    id
	}
}
`