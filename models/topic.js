const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
  },
  route: Array,
  subWay: Array,
  direction: Array,
  layout: String,
  sex: String,
  area: String,
  type: String,
  mode: String,
  amount: Array,
  phone: String,
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('rent_room_list', topicSchema)