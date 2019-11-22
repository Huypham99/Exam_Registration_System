const Module = `

type Module{
  id: ID!
  moduleId: String
  name: String
}

input createNewModuleInput{
  moduleId: String
  name: String
}

input editModuleInput{
  moduleId: String
  newModuleId: String
  newName: String
}

extend type Query {
    getModuleById(id: ID): Module 
    getAllModules: [Module]
}

extend type Mutation {
  createNewModule(input: createNewModuleInput): Module
  deleteModule(id: String): Module
  editModule(input: editModuleInput): Module
}
`
module.exports = Module;