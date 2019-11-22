const UserTypes = require('./types/User')
const ExamTypes = require('./types/Exam')
const ShiftTypes = require('./types/Shift')
const ModuleTypes = require('./types/Module')
const HallTypes = require('./types/Hall')
const ShiftHallTypes = require('./types/Shift_Hall')
const StudentModuleTypes = require('./types/Student_Module')
const StudentShiftTypes = require('./types/Student_Shift')

const userQueries = require('./queries/user')
const hallQueries = require('./queries/hall')
const shiftHallQueries = require('./queries/shift_hall')
const examQueries = require('./queries/exam')
const shiftQueries = require('./queries/shift')
const moduleQueries = require('./queries/module')
const studentModuleQueries = require('./queries/student_module')
const studentShiftQueries = require('./queries/student_shift')

const userMutation = require('./mutations/user')
const hallMutation = require('./mutations/hall')
const shiftHallMutation = require('./mutations/shift_hall')
const shiftMutation = require('./mutations/shift')
const examMutation = require('./mutations/exam')
const moduleMutation = require('./mutations/module')
const studentModuleMutation = require('./mutations/student_module')
const studentShiftMutation = require('./mutations/student_shift')

const {
    ApolloServer,
    makeExecutableSchema,
    addMockFunctionsToSchema,
    mergeSchemas,
} = require('apollo-server')

const { merge } = require('lodash');

const Root = /* GraphQL */ `
  type Query {
    dummy: String
  }
  type Mutation {
    dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = merge(
  {},
  // queries
  examQueries,
  shiftQueries,
  moduleQueries,
  userQueries,
  hallQueries,
  shiftHallQueries,
  studentModuleQueries,
  studentShiftQueries,
  // mutations
  userMutation,
  moduleMutation,
  hallMutation,
  examMutation,
  shiftMutation,
  shiftHallMutation,
  studentModuleMutation,
  studentShiftMutation
)

const schema = makeExecutableSchema({
    typeDefs: [
      Root, 
      ExamTypes,
      ShiftTypes,
      ModuleTypes,
      UserTypes,
      HallTypes,
      ShiftHallTypes,
      StudentModuleTypes,
      StudentShiftTypes
    ],
    resolvers,
});


module.exports = schema;

