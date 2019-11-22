const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ShiftHallSchema = new Schema({
  shiftId: {
    type: String
  },
  hallId: {
    type: String
  }
})

module.exports = mongoose.model('Shift_Hall', ShiftHallSchema)
