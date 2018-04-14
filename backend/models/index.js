'use strict'

var env       = 'mongodb'
var config    = require(__dirname + '/../config/config.json')[env]

const user = config.username
const password = config.password
const host = config.host
const port = config.port
const database = config.database
const mongoose = require('mongoose')
mongoose.connect('mongodb://'+user+':'+password+'@'+host+':'+port+'/'+database)

module.exports = {
  User: require('./user'),
  Item: require('./item'),
  Upgrade: require('./upgrade'),
  Connection: mongoose.connection
}