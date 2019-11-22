const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hallSchema = new Schema({
  name: {
    type: String
  },
  capacity: {
    type: Number
  }
})

module.exports = mongoose.model('Hall', hallSchema)
