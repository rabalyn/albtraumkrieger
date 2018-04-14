'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
  accountid: String,
  username: {type: String, unique: false},
  apikey: String,
  password: {type: String, unique: false},
  email: String,
  joinedAt: Date,
  rank: String,
  isAdmin: Boolean
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)