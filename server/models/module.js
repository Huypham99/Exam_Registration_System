const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moduleSchema = new Schema({
  moduleId: {
    type: String
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model('Module', moduleSchema)
