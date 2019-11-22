const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String
  },
  password: {
    type: String,
    default: "12345678"
  },
  email: {
    type: String
  },
  dob: {
    type: String
  },
  studentId: {
    type: Number
  },
  program: {
    type: String
  },
  schoolYear: {
    type: String
  },
  profilePhoto: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  isEligible: {
    type: Boolean
  },
  registeredModules: {
    type: Array
  },
  examShifts: {
    type: Array
  }
})

module.exports = mongoose.model('User', userSchema)
