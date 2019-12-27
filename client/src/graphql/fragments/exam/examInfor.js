import gql from 'graphql-tag';

export default gql`
  fragment examInfor on Exam {
    id
    name
    academyYear
    trainingSystem
    openDate
    openTime
    endDate
    endTime
  }
`;