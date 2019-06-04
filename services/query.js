const config = require('../config/mysqlconfig');
const Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    port:'3306',
    logging: true,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
 

module.exports =   sequelize ;