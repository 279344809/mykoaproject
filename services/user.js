const Sequelize = require('sequelize');
const sequelize = require('./query');
var User = require('../models/users')(sequelize, Sequelize)

class User {
    static async search(params) {
        var users = await User.findAll({
            where: params
        });
        console.log(`find ${users.length} pets:`);
        return users
    }


}