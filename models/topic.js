const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }, // 标题
  time: {
    type: String,
    required: true,
  }, // 时间戳
  route: Array, // 地铁线
  subWay: Array, // 地铁站
  direction: Array, // 朝向
  layout: String, // 布局
  sex: String, // 性别
  area: String, // 面积
  type: String, // 类型
  mode: String, // 金额方式
  amount: Array, // 金额
  phone: String, // 手机号
  url: {
    type: String,
    required: true
  } // 帖子地址
})

module.exports = mongoose.model('rent_room_list', topicSchema)