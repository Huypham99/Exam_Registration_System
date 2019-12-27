import gql from 'graphql-tag';
import userInforFragment from '../../fragments/user/userInfor'
import moduleInforFragment from '../../fragments/module/moduleInfor'

export const getStudentModuleByStudentId = gql`
query ($student: String){
    getStudentModuleByStudentId(studentId: $studentId){
      id
      moduleId
      studentId
      isEligible
      studentInfor{
        ...userInfor
      }
      moduleInfor{
        ...moduleInfor
      }
    }
}
${userInforFragment}
${moduleInforFragment}
`;

export const getStudentModuleByModuleId = gql`
query ($moduleId: String){
    getStudentModuleByModuleId(moduleId: $moduleId){
      id
      moduleId
      studentId
      isEligible
      studentInfor{
        ...userInfor
      }
      moduleInfor{
        ...moduleInfor
      }
    }
}
${userInforFragment}
${moduleInforFragment}
`;

export const getIneligibleStudents = gql`
query {
    getIneligibleStudents{
      studentInfor{
        ...userInfor
      }
      moduleInfor{
        ...moduleInfor
      }
    }
}
${userInforFragment}
${moduleInforFragment}
`;

export const getIneligibleByStudentIdQuery = gql`
query ($studentId: Int){
    getIneligibleByStudentId(studentId: $studentId){
      moduleId
    }
}
`;

export const getEligibleStudents = gql`
query {
    getEligibleStudents{
      studentInfor{
        ...userInfor
      }
      moduleInfor{
        ...moduleInfor
      }
    }
}
${userInforFragment}
${moduleInforFragment}
`;

