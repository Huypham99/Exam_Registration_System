import gql from 'graphql-tag';

export default gql`
  fragment shiftInfor on Shift {
    id
    time
    date
    dayOfWeek
  }
`;