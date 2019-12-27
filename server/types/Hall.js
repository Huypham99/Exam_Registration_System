const Hall = `

type Hall{
   id: ID!
   name: String
   capacity: Int
}

input createNewHallInput{
  name: String
  capacity: Int
}

input editHallInput{
  name: String
  newName: String
  newCapacity: Int
}

extend type Query {
  getHallById(id: ID): Hall
  getAllHalls: [Hall]
}

extend type Mutation {
  createNewHall(input: createNewHallInput): Hall
  editHall(input: editHallInput): Hall
  deleteHall(id: String): Hall
}
`
module.exports = Hall;