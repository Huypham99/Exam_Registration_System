const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shiftSchema = new Schema({
  time: {
    type: String
  },
  date: {
    type: String
  },
  dayOfWeek: {
    type: String
  },
  examId: {
    type: String
  },
  moduleId: {
    type: String
  }
})

module.exports = mongoose.model('Shift', shiftSchema)
