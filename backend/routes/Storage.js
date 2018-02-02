const Sequelize = require('sequelize')

class Storage {
  constructor(config) {
    this.sequelize = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'sqlite',
    
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    
      // SQLite only
      storage: config.app.database.path
    })

  }
  
  checkConnection() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      })
  }
}

export default Storage