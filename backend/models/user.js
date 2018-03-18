'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
  accountid: String,
  apikey: String,
  password: String,
  email: String,
  joinedAt: Date,
  rank: String
}))

/*
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    accountid: DataTypes.STRING,
    apikey: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    joinedAt: DataTypes.DATE,
    rank: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
*/