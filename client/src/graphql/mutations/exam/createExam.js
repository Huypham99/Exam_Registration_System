import gql from 'graphql-tag';
export const createExamMutation = gql`
  mutation (
    $name: String,
    $academyYear: String
    $trainingSystem: String,
    $openDate: String,
    $openTime: String
    $endDate: String,
    $endTime: String
  )
  {
    createNewExam(input: {
      name: $name,
      academyYear: $academyYear ,
      trainingSystem: $trainingSystem,
      openDate: $openDate,
      openTime: $openTime ,
      endDate: $endDate ,
      endTime: $endTime
    })
    {
      id
    }
  }
`