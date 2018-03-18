'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Upgrade', new Schema({
  upgradeid: Number,
  name: String,
  description: String,
  type: String,
  icon: String
}))