'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Item', new Schema({
  itemid: Number,
  name: String,
  description: String,
  type: String,
  level: Number,
  rarity: String,
  vendor_value: Number,
  default_skin: Number,
  chat_link: String,
  icon: String
}))