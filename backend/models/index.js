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
  Upgrade: require('./upgrade')
}

/*
if (config.use_env_variable) {
  console.log(config)
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/