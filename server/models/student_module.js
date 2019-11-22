const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentModuleSchema = new Schema({
  studentId: {
    type: String,
    require: true
  },
  moduleId: {
    type: String,
    require: true
  },
  isEligible: {
    type: Boolean,
    require: true
  }
})

module.exports = mongoose.model('Student_Module', studentModuleSchema)
