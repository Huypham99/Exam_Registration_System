const Shift_Hall = `

type Shift_Hall{
   id: ID!
   shiftId: ID
   hallId: ID
   hallDetail: Hall
   shiftDetail: Shift
}

input createNewShiftHallInput{
   shiftId: ID
   hallId: ID
}

extend type Query {
   getHasHallById(id: ID): Shift_Hall 
}

extend type Mutation {
  createNewShiftHall(input: createNewShiftHallInput): Shift_Hall
  deleteShiftHallByShiftId(id: String): Shift_Hall
}
`
module.exports = Shift_Hall;