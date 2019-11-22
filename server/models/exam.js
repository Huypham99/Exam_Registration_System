const mongoose = require('mongoose')

const Schema = mongoose.Schema

const examSchema = new Schema({
  name: {
    type: String
  },
  academyYear: {
    type: String
  },
  trainingSystem: {
    type: String
  }
})

module.exports = mongoose.model('Exam', examSchema)
