const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StudentShiftSchema = new Schema({
  shiftHallId: {
    type: String
  },
  studentId: {
    type: String
  }
})

module.exports = mongoose.model('Student_Shift', StudentShiftSchema)
